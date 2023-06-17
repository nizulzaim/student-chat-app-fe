import { ApolloClient, InMemoryCache, from, split } from '@apollo/client/core'
import type { ErrorResponse } from '@apollo/client/link/error'
import { onError } from '@apollo/client/link/error'
import { setContext } from 'apollo-link-context'
import { provideApolloClient } from '@vue/apollo-composable'
import { createUploadLink } from 'apollo-upload-client'
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities"
import { loginRequest } from '~~/msal/config';

// Create the apollo client
export default () => {
  const { instance } = useMsal()

  const cookie = useCookie('apollo:default.token', { path: '/' })


  const parseHeaders = (rawHeaders: any) => {
    const headers = new Headers()
    const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ')

    preProcessedHeaders.split(/\r?\n/).forEach((line: any) => {
      const parts = line.split(':')
      const key = parts.shift().trim()
      if (key) {
        const value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  const uploadFetch = (url: string, options: any) =>
    new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.onload = () => {
        const opts: any = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || ''),
        }
        opts.url = 'responseURL' in xhr ? xhr.responseURL : opts.headers.get('X-Request-URL')

        const body = 'response' in xhr ? xhr.response : (xhr as any).responseText
        resolve(new Response(body, opts))
      }
      xhr.onerror = () => {
        reject(new TypeError('Network request failed'))
      }
      xhr.ontimeout = () => {
        reject(new TypeError('Network request failed'))
      }
      xhr.open(options.method, url, true)

      Object.keys(options.headers).forEach((key) => {
        xhr.setRequestHeader(key, options.headers[key])
      })

      if (xhr.upload) xhr.upload.onprogress = options.onProgress

      xhr.send(options.body)
    })

  const customFetch = async (uri: string, options: any) => {
    if (options.useUpload) {
      const res = uploadFetch(uri, options)
      return res
    }

    const res = await fetch(uri, options)
    return res
  }

  const createHttpLink = () => {
    return createUploadLink({
      uri: 'http://localhost:7070/graphql',
      fetch: customFetch as never,
    })
  }

  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
        createClient({
          url: "ws://localhost:7070/graphql",
        })
      )
      : null;



  const authLink = setContext(async (_, { headers }) => {
    try {
      if (process.client) {
        const response = await instance.acquireTokenSilent(loginRequest)
        cookie.value = response.idToken
      }
      return {
        headers: {
          ...headers,
          authorization: cookie.value
            ? `Bearer ${cookie.value}`
            : '',
          'Apollo-Require-Preflight': 'true'
        },
      }
    } catch (err) {
      console.log(err)
    }
  })

  const errorLink = onError((error: ErrorResponse) => {
    if (error.graphQLErrors) {
      error.graphQLErrors.forEach((item) => {
        if (item.message === 'You are not authorized') {
          const cookie = useCookie('apollo:default.token', { path: '/' })
          cookie.value = null
          return window.location.replace('/')
        }
      })

      // if (error.graphQLErrors[0]) {
      //   messageModal.open({
      //     header: 'Something wrong',
      //     type: 'error',
      //     message: `We have detect an issue while performing your request. Please help to try again later. \n Error message: ${error.graphQLErrors[0].message}`,
      //   })
      // }
    }
  })

  // Cache implementation
  const cache = new InMemoryCache()

  const createApolloClient = () => {
    const link = wsLink ? split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query)
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        )
      },
      wsLink,
      createHttpLink()
    ) : createHttpLink()

    return new ApolloClient({
      link: from([errorLink.concat(authLink as any), link]),
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'network-only',
        },
        query: {
          fetchPolicy: 'network-only',
        },
      },
    })
  }
  provideApolloClient(createApolloClient())
}

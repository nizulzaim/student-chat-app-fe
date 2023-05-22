import {
  ApolloClient,
  InMemoryCache,
  from,
} from '@apollo/client/core'
import type { ErrorResponse } from '@apollo/client/link/error'
import { onError } from '@apollo/client/link/error'
import { setContext } from 'apollo-link-context'
import { useCookies } from '@vueuse/integrations/useCookies'
import { provideApolloClient } from '@vue/apollo-composable'
import { createUploadLink } from 'apollo-upload-client'

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

export const uploadFetch = (url: string, options: any) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = () => {
      const opts: any = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || ''),
      }
      opts.url
        = 'responseURL' in xhr
          ? xhr.responseURL
          : opts.headers.get('X-Request-URL')

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

    if (xhr.upload)
      xhr.upload.onprogress = options.onProgress

    xhr.send(options.body)
  })

export const customFetch = async (uri: string, options: any) => {
  if (options.useUpload) {
    const res = uploadFetch(uri, options)
    return res
  }

  const res = await fetch(uri, options)
  return res
}

const createHttpLink = () => {
  return createUploadLink({
    uri: 'http://localhost:6001/graphql',
    fetch: customFetch as never,
  })
}

const authLink = setContext((_, { headers }) => {
  const cookie = useCookies(['apollo:default.token'])

  return {
    headers: {
      ...headers,
      authorization: cookie.get('apollo:default.token') ? `Bearer ${cookie.get('apollo:default.token')}` : '',
    },
  }
})

const errorLink = onError((error: ErrorResponse) => {
  if (error.graphQLErrors) {
    error.graphQLErrors.forEach((item) => {
      if (item.message === 'You are not authorized') {
        const cookie = useCookies(['apollo:default.token'])
        cookie.remove('apollo:default.token')
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
  return new ApolloClient({
    link: from([errorLink.concat(authLink as any), createHttpLink()]),
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
// Create the apollo client
export const apolloClient = createApolloClient

export default () => {
  provideApolloClient(createApolloClient())
}
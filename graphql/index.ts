import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Conversation = {
  __typename?: 'Conversation';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  lastMessageAt?: Maybe<Scalars['DateTime']>;
  numberOfUnread: Scalars['Int'];
  type: ConversationType;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ID'];
  userIds: Array<Scalars['ID']>;
  users: Array<User>;
  usersMeta: Array<UserMeta>;
};

export enum ConversationType {
  Group = 'group',
  Private = 'private'
}

export type ConversationsSortArgs = {
  email?: InputMaybe<SortEnum>;
  firstName?: InputMaybe<SortEnum>;
  lastName?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type CreateConversationInput = {
  lastMessageAt?: InputMaybe<Scalars['DateTime']>;
  type?: ConversationType;
  userIds: Array<Scalars['ID']>;
};

export type CreateFacultyInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateMessageInput = {
  conversationId: Scalars['ID'];
  text: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  timezone?: InputMaybe<Scalars['String']>;
};

export type FacultiesSortArgs = {
  name?: InputMaybe<SortEnum>;
  slug?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type Faculty = {
  __typename?: 'Faculty';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ID'];
};

export type FindAllConversationsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  userIds?: InputMaybe<Scalars['ID']>;
};

export type FindAllFacultiesInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type FindAllMessagesInput = {
  conversationId?: InputMaybe<Scalars['ID']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  userIds?: InputMaybe<Scalars['ID']>;
};

export type FindAllUsersInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type FindOneConversationInput = {
  _id?: InputMaybe<Scalars['ID']>;
};

export type FindOneFacultyInput = {
  _id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type FindOneUserInput = {
  _id?: InputMaybe<Scalars['ID']>;
  email?: InputMaybe<Scalars['String']>;
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String'];
  user: User;
};

export type LoginWithPasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  _id: Scalars['ID'];
  conversationId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ID'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ID'];
};

export type MessagesSortArgs = {
  email?: InputMaybe<SortEnum>;
  firstName?: InputMaybe<SortEnum>;
  lastName?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createConversation: Conversation;
  createFaculty: Faculty;
  createMessage: Message;
  createUser: User;
  loginWithPassword: LoginResult;
  updateFaculty: Faculty;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateFacultyArgs = {
  input: CreateFacultyInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationLoginWithPasswordArgs = {
  input: LoginWithPasswordInput;
};


export type MutationUpdateFacultyArgs = {
  input: UpdateFacultyInput;
};

export type PaginatedConversation = {
  __typename?: 'PaginatedConversation';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Conversation>>;
  page: Scalars['Int'];
};

export type PaginatedFaculties = {
  __typename?: 'PaginatedFaculties';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Faculty>>;
  page: Scalars['Int'];
};

export type PaginatedMessage = {
  __typename?: 'PaginatedMessage';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Message>>;
  page: Scalars['Int'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<User>>;
  page: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  conversation: Conversation;
  conversations: PaginatedConversation;
  currentUser: User;
  faculties: PaginatedFaculties;
  faculty: Faculty;
  messages?: Maybe<PaginatedMessage>;
  user: User;
  users: PaginatedUsers;
};


export type QueryConversationArgs = {
  input: FindOneConversationInput;
};


export type QueryConversationsArgs = {
  input: FindAllConversationsInput;
  sort: ConversationsSortArgs;
};


export type QueryFacultiesArgs = {
  query: FindAllFacultiesInput;
  sort?: InputMaybe<FacultiesSortArgs>;
};


export type QueryFacultyArgs = {
  query: FindOneFacultyInput;
};


export type QueryMessagesArgs = {
  input: FindAllMessagesInput;
  sort: MessagesSortArgs;
};


export type QueryUserArgs = {
  query: FindOneUserInput;
};


export type QueryUsersArgs = {
  query: FindAllUsersInput;
  sort?: InputMaybe<UsersSortArgs>;
};

export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Subscription = {
  __typename?: 'Subscription';
  conversationUpdated: Conversation;
  messageAdded: Message;
};


export type SubscriptionConversationUpdatedArgs = {
  userId: Scalars['String'];
};


export type SubscriptionMessageAddedArgs = {
  conversationId: Scalars['String'];
};

export type UpdateFacultyInput = {
  _id: Scalars['ID'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ID'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  lastName: Scalars['String'];
  timezone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ID'];
};

export type UserMeta = {
  __typename?: 'UserMeta';
  lastReadAt: Scalars['DateTime'];
  userId: Array<Scalars['ID']>;
};

export type UsersSortArgs = {
  email?: InputMaybe<SortEnum>;
  firstName?: InputMaybe<SortEnum>;
  lastName?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type LoginWithPasswordMutationVariables = Exact<{
  input: LoginWithPasswordInput;
}>;


export type LoginWithPasswordMutation = { __typename?: 'Mutation', loginWithPassword: { __typename?: 'LoginResult', token: string, user: { __typename?: 'User', _id: string } } };

export type ConversationsQueryVariables = Exact<{
  input: FindAllConversationsInput;
  sort: ConversationsSortArgs;
}>;


export type ConversationsQuery = { __typename?: 'Query', conversations: { __typename?: 'PaginatedConversation', items?: Array<{ __typename?: 'Conversation', _id: string, type: ConversationType, numberOfUnread: number, users: Array<{ __typename?: 'User', _id: string, displayName: string, email: string }> }> | null } };

export type CreateConversationMutationVariables = Exact<{
  input: CreateConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', _id: string } };

export type ConversationUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ConversationUpdatedSubscription = { __typename?: 'Subscription', conversationUpdated: { __typename?: 'Conversation', _id: string } };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', _id: string, text: string, createdById: string } };

export type MessagesQueryVariables = Exact<{
  input: FindAllMessagesInput;
  sort: MessagesSortArgs;
}>;


export type MessagesQuery = { __typename?: 'Query', messages?: { __typename?: 'PaginatedMessage', count: number, hasNextPage: boolean, hasPreviousPage: boolean, page: number, items?: Array<{ __typename?: 'Message', _id: string, createdAt: any, createdById: string, text: string, conversationId: string, createdBy: { __typename?: 'User', email: string, displayName: string } }> | null } | null };

export type MessageAddedSubscriptionVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: { __typename?: 'Message', _id: string, createdAt: any, createdById: string, text: string, conversationId: string, createdBy: { __typename?: 'User', email: string, displayName: string } } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', _id: string, createdAt: any, email: string, firstName: string, displayName: string, isActive: boolean, lastName: string, timezone: string, updatedAt: any } };

export type UsersQueryVariables = Exact<{
  query: FindAllUsersInput;
  sort?: InputMaybe<UsersSortArgs>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', count: number, hasNextPage: boolean, hasPreviousPage: boolean, items?: Array<{ __typename?: 'User', _id: string, displayName: string, email: string }> | null } };


export const LoginWithPasswordDocument = gql`
    mutation LoginWithPassword($input: LoginWithPasswordInput!) {
  loginWithPassword(input: $input) {
    token
    user {
      _id
    }
  }
}
    `;

/**
 * __useLoginWithPasswordMutation__
 *
 * To run a mutation, you first call `useLoginWithPasswordMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithPasswordMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useLoginWithPasswordMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useLoginWithPasswordMutation(options: VueApolloComposable.UseMutationOptions<LoginWithPasswordMutation, LoginWithPasswordMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<LoginWithPasswordMutation, LoginWithPasswordMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<LoginWithPasswordMutation, LoginWithPasswordMutationVariables>(LoginWithPasswordDocument, options);
}
export type LoginWithPasswordMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<LoginWithPasswordMutation, LoginWithPasswordMutationVariables>;
export const ConversationsDocument = gql`
    query Conversations($input: FindAllConversationsInput!, $sort: ConversationsSortArgs!) {
  conversations(input: $input, sort: $sort) {
    items {
      users {
        _id
        displayName
        email
      }
      _id
      type
      numberOfUnread
    }
  }
}
    `;

/**
 * __useConversationsQuery__
 *
 * To run a query within a Vue component, call `useConversationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useConversationsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useConversationsQuery({
 *   input: // value for 'input'
 *   sort: // value for 'sort'
 * });
 */
export function useConversationsQuery(variables: ConversationsQueryVariables | VueCompositionApi.Ref<ConversationsQueryVariables> | ReactiveFunction<ConversationsQueryVariables>, options: VueApolloComposable.UseQueryOptions<ConversationsQuery, ConversationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ConversationsQuery, ConversationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ConversationsQuery, ConversationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, variables, options);
}
export function useConversationsLazyQuery(variables: ConversationsQueryVariables | VueCompositionApi.Ref<ConversationsQueryVariables> | ReactiveFunction<ConversationsQueryVariables>, options: VueApolloComposable.UseQueryOptions<ConversationsQuery, ConversationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ConversationsQuery, ConversationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ConversationsQuery, ConversationsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<ConversationsQuery, ConversationsQueryVariables>(ConversationsDocument, variables, options);
}
export type ConversationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ConversationsQuery, ConversationsQueryVariables>;
export const CreateConversationDocument = gql`
    mutation CreateConversation($input: CreateConversationInput!) {
  createConversation(input: $input) {
    _id
  }
}
    `;

/**
 * __useCreateConversationMutation__
 *
 * To run a mutation, you first call `useCreateConversationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateConversationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateConversationMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateConversationMutation(options: VueApolloComposable.UseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateConversationMutation, CreateConversationMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateConversationMutation, CreateConversationMutationVariables>(CreateConversationDocument, options);
}
export type CreateConversationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateConversationMutation, CreateConversationMutationVariables>;
export const ConversationUpdatedDocument = gql`
    subscription ConversationUpdated($userId: String!) {
  conversationUpdated(userId: $userId) {
    _id
  }
}
    `;

/**
 * __useConversationUpdatedSubscription__
 *
 * To run a query within a Vue component, call `useConversationUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useConversationUpdatedSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useConversationUpdatedSubscription({
 *   userId: // value for 'userId'
 * });
 */
export function useConversationUpdatedSubscription(variables: ConversationUpdatedSubscriptionVariables | VueCompositionApi.Ref<ConversationUpdatedSubscriptionVariables> | ReactiveFunction<ConversationUpdatedSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>(ConversationUpdatedDocument, variables, options);
}
export type ConversationUpdatedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<ConversationUpdatedSubscription, ConversationUpdatedSubscriptionVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    _id
    text
    createdById
  }
}
    `;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateMessageMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateMessageMutation(options: VueApolloComposable.UseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
}
export type CreateMessageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateMessageMutation, CreateMessageMutationVariables>;
export const MessagesDocument = gql`
    query Messages($input: FindAllMessagesInput!, $sort: MessagesSortArgs!) {
  messages(input: $input, sort: $sort) {
    count
    hasNextPage
    hasPreviousPage
    page
    items {
      _id
      createdAt
      createdBy {
        email
        displayName
      }
      createdById
      text
      conversationId
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a Vue component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useMessagesQuery({
 *   input: // value for 'input'
 *   sort: // value for 'sort'
 * });
 */
export function useMessagesQuery(variables: MessagesQueryVariables | VueCompositionApi.Ref<MessagesQueryVariables> | ReactiveFunction<MessagesQueryVariables>, options: VueApolloComposable.UseQueryOptions<MessagesQuery, MessagesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MessagesQuery, MessagesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MessagesQuery, MessagesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, variables, options);
}
export function useMessagesLazyQuery(variables: MessagesQueryVariables | VueCompositionApi.Ref<MessagesQueryVariables> | ReactiveFunction<MessagesQueryVariables>, options: VueApolloComposable.UseQueryOptions<MessagesQuery, MessagesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<MessagesQuery, MessagesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<MessagesQuery, MessagesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, variables, options);
}
export type MessagesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<MessagesQuery, MessagesQueryVariables>;
export const MessageAddedDocument = gql`
    subscription MessageAdded($conversationId: String!) {
  messageAdded(conversationId: $conversationId) {
    _id
    createdAt
    createdBy {
      email
      displayName
    }
    createdById
    text
    conversationId
  }
}
    `;

/**
 * __useMessageAddedSubscription__
 *
 * To run a query within a Vue component, call `useMessageAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMessageAddedSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useMessageAddedSubscription({
 *   conversationId: // value for 'conversationId'
 * });
 */
export function useMessageAddedSubscription(variables: MessageAddedSubscriptionVariables | VueCompositionApi.Ref<MessageAddedSubscriptionVariables> | ReactiveFunction<MessageAddedSubscriptionVariables>, options: VueApolloComposable.UseSubscriptionOptions<MessageAddedSubscription, MessageAddedSubscriptionVariables> | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<MessageAddedSubscription, MessageAddedSubscriptionVariables>> | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<MessageAddedSubscription, MessageAddedSubscriptionVariables>> = {}) {
  return VueApolloComposable.useSubscription<MessageAddedSubscription, MessageAddedSubscriptionVariables>(MessageAddedDocument, variables, options);
}
export type MessageAddedSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<MessageAddedSubscription, MessageAddedSubscriptionVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    _id
    createdAt
    email
    firstName
    displayName
    isActive
    lastName
    timezone
    updatedAt
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a Vue component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCurrentUserQuery();
 */
export function useCurrentUserQuery(options: VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, {}, options);
}
export function useCurrentUserLazyQuery(options: VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CurrentUserQuery, CurrentUserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, {}, options);
}
export type CurrentUserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CurrentUserQuery, CurrentUserQueryVariables>;
export const UsersDocument = gql`
    query Users($query: FindAllUsersInput!, $sort: UsersSortArgs) {
  users(query: $query, sort: $sort) {
    count
    hasNextPage
    hasPreviousPage
    items {
      _id
      displayName
      email
    }
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a Vue component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUsersQuery({
 *   query: // value for 'query'
 *   sort: // value for 'sort'
 * });
 */
export function useUsersQuery(variables: UsersQueryVariables | VueCompositionApi.Ref<UsersQueryVariables> | ReactiveFunction<UsersQueryVariables>, options: VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, variables, options);
}
export function useUsersLazyQuery(variables: UsersQueryVariables | VueCompositionApi.Ref<UsersQueryVariables> | ReactiveFunction<UsersQueryVariables>, options: VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UsersQuery, UsersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, variables, options);
}
export type UsersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UsersQuery, UsersQueryVariables>;
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
  JSON: any;
  ObjectId: any;
};

export type AddUserToUserGroupInput = {
  _id: Scalars['ObjectId'];
  userId: Scalars['ObjectId'];
};

export type CreateOrganizationInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  operationalDays: Array<DayOfWeek>;
  ownerId: Scalars['ObjectId'];
};

export type CreateUserGroupInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName: Scalars['String'];
  password: Scalars['String'];
  timezone?: InputMaybe<Scalars['String']>;
};

export enum DayOfWeek {
  Friday = 'Friday',
  Monday = 'Monday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
  Thursday = 'Thursday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday'
}

export type FindOrganizationArgs = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FindOrganizationsPaginationArgs = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type FindUserArgs = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  email?: InputMaybe<Scalars['String']>;
};

export type FindUserGroupArgs = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FindUserGroupsPaginationArgs = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type FindUsersPaginationArgs = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  email?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type HistoryTrackingDiff = {
  __typename?: 'HistoryTrackingDiff';
  added: Scalars['JSON'];
  deleted: Scalars['JSON'];
  updated: Scalars['JSON'];
};

export type LoginPasswordInput = {
  email: Scalars['String'];
  organizationId?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  token: Scalars['String'];
  user: User;
};

export type MasterEntity = {
  __typename?: 'MasterEntity';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  isActive: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUserToUserGroup: UserGroup;
  createOrganization: Organization;
  createUser: User;
  createUserGroup: UserGroup;
  loginWithPassword?: Maybe<LoginResult>;
  updateCurrentOrganization: Organization;
  updateOrganization: Organization;
  updateUser: User;
  updateUserGroup: UserGroup;
};


export type MutationAddUserToUserGroupArgs = {
  input: AddUserToUserGroupInput;
};


export type MutationCreateOrganizationArgs = {
  input: CreateOrganizationInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserGroupArgs = {
  input: CreateUserGroupInput;
};


export type MutationLoginWithPasswordArgs = {
  input: LoginPasswordInput;
};


export type MutationUpdateCurrentOrganizationArgs = {
  input: UpdateCurrentOrganizationInput;
};


export type MutationUpdateOrganizationArgs = {
  input: UpdateOrganizationInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUpdateUserGroupArgs = {
  input: UpdateUserGroupInput;
};

export type Organization = {
  __typename?: 'Organization';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  internalName: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  operationalDays: Array<DayOfWeek>;
  owner: User;
  ownerId: Scalars['ObjectId'];
  updatedAt: Scalars['DateTime'];
};

export type OrganizationsSortArgs = {
  name?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type PaginatedOrganizations = {
  __typename?: 'PaginatedOrganizations';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<Organization>;
  page: Scalars['Float'];
  total: Scalars['Float'];
};

export type PaginatedUserGroups = {
  __typename?: 'PaginatedUserGroups';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<UserGroup>;
  page: Scalars['Float'];
  total: Scalars['Float'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<User>;
  page: Scalars['Float'];
  total: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  currentOrganization?: Maybe<Organization>;
  currentUser: User;
  organization?: Maybe<Organization>;
  organizations: PaginatedOrganizations;
  user?: Maybe<User>;
  userGroup: UserGroup;
  userGroups: PaginatedUserGroups;
  users: PaginatedUsers;
};


export type QueryOrganizationArgs = {
  args: FindOrganizationArgs;
};


export type QueryOrganizationsArgs = {
  query: FindOrganizationsPaginationArgs;
  sort?: InputMaybe<OrganizationsSortArgs>;
};


export type QueryUserArgs = {
  args: FindUserArgs;
};


export type QueryUserGroupArgs = {
  args: FindUserGroupArgs;
};


export type QueryUserGroupsArgs = {
  query: FindUserGroupsPaginationArgs;
  sort?: InputMaybe<UserGroupsSortArgs>;
};


export type QueryUsersArgs = {
  query: FindUsersPaginationArgs;
  sort?: InputMaybe<UsersSortArgs>;
};

export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type UpdateCurrentOrganizationInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  operationalDays?: InputMaybe<Array<DayOfWeek>>;
  ownerId?: InputMaybe<Scalars['ObjectId']>;
};

export type UpdateOrganizationInput = {
  _id: Scalars['ObjectId'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  operationalDays?: InputMaybe<Array<DayOfWeek>>;
  ownerId?: InputMaybe<Scalars['ObjectId']>;
};

export type UpdateUserGroupInput = {
  _id: Scalars['ObjectId'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserInput = {
  _id: Scalars['ObjectId'];
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  timezone?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  isActive: Scalars['Boolean'];
  lastName: Scalars['String'];
  organizationIds: Array<Scalars['ObjectId']>;
  organizations?: Maybe<Array<Organization>>;
  pictureUrl?: Maybe<Scalars['String']>;
  timezone: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserGroup = {
  __typename?: 'UserGroup';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  organizationId: Scalars['ObjectId'];
  updatedAt: Scalars['DateTime'];
  userIds?: Maybe<Array<Scalars['ObjectId']>>;
};

export type UserGroupsSortArgs = {
  name?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type UsersSortArgs = {
  displayName?: InputMaybe<SortEnum>;
  email?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type LoginWithPasswordMutationVariables = Exact<{
  input: LoginPasswordInput;
}>;


export type LoginWithPasswordMutation = { __typename?: 'Mutation', loginWithPassword?: { __typename?: 'LoginResult', token: string, user: { __typename?: 'User', _id: any, createdAt: any, isActive: boolean, updatedAt: any, firstName: string, lastName: string, email: string, timezone: string, pictureUrl?: string | null } } | null };

export type CurrentOrganizationQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOrganizationQuery = { __typename?: 'Query', currentOrganization?: { __typename?: 'Organization', _id: any, createdAt: any, updatedAt: any, internalName: string, name: string, isActive: boolean, operationalDays: Array<DayOfWeek>, owner: { __typename?: 'User', _id: any, email: string, displayName: string, pictureUrl?: string | null } } | null };

export type UpdateCurrentOrganizationMutationVariables = Exact<{
  input: UpdateCurrentOrganizationInput;
}>;


export type UpdateCurrentOrganizationMutation = { __typename?: 'Mutation', updateCurrentOrganization: { __typename?: 'Organization', _id: any, internalName: string, name: string } };

export type OrganizationsQueryVariables = Exact<{
  query: FindOrganizationsPaginationArgs;
  sort?: InputMaybe<OrganizationsSortArgs>;
}>;


export type OrganizationsQuery = { __typename?: 'Query', organizations: { __typename?: 'PaginatedOrganizations', hasNextPage: boolean, hasPreviousPage: boolean, page: number, total: number, items: Array<{ __typename?: 'Organization', _id: any, createdAt: any, updatedAt: any, internalName: string, name: string, isActive: boolean, owner: { __typename?: 'User', _id: any, email: string, displayName: string, pictureUrl?: string | null } }> } };

export type OrganizationQueryVariables = Exact<{
  args: FindOrganizationArgs;
}>;


export type OrganizationQuery = { __typename?: 'Query', organization?: { __typename?: 'Organization', _id: any, createdAt: any, updatedAt: any, internalName: string, name: string, isActive: boolean, operationalDays: Array<DayOfWeek>, owner: { __typename?: 'User', _id: any, email: string, displayName: string, pictureUrl?: string | null } } | null };

export type CreateOrganizationMutationVariables = Exact<{
  input: CreateOrganizationInput;
}>;


export type CreateOrganizationMutation = { __typename?: 'Mutation', createOrganization: { __typename?: 'Organization', _id: any, internalName: string, name: string } };

export type UpdateOrganizationMutationVariables = Exact<{
  input: UpdateOrganizationInput;
}>;


export type UpdateOrganizationMutation = { __typename?: 'Mutation', updateOrganization: { __typename?: 'Organization', _id: any, internalName: string, name: string } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', _id: any, email: string, displayName: string, firstName: string, lastName: string, pictureUrl?: string | null } };

export type UsersQueryVariables = Exact<{
  query: FindUsersPaginationArgs;
  sort?: InputMaybe<UsersSortArgs>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', hasPreviousPage: boolean, page: number, total: number, hasNextPage: boolean, items: Array<{ __typename?: 'User', _id: any, email: string, createdAt: any, timezone: string, pictureUrl?: string | null, firstName: string, displayName: string, isActive: boolean, lastName: string, updatedAt: any }> } };

export type UserQueryVariables = Exact<{
  args: FindUserArgs;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', _id: any, isActive: boolean, createdAt: any, updatedAt: any, firstName: string, lastName: string, email: string, timezone: string, pictureUrl?: string | null, organizationIds: Array<any>, displayName: string } | null };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', _id: any, createdAt: any, email: string, firstName: string, isActive: boolean, lastName: string, organizationIds: Array<any> } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', _id: any } };


export const LoginWithPasswordDocument = gql`
    mutation LoginWithPassword($input: LoginPasswordInput!) {
  loginWithPassword(input: $input) {
    token
    user {
      _id
      createdAt
      isActive
      updatedAt
      firstName
      lastName
      email
      timezone
      pictureUrl
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
export const CurrentOrganizationDocument = gql`
    query CurrentOrganization {
  currentOrganization {
    _id
    createdAt
    updatedAt
    internalName
    name
    isActive
    operationalDays
    owner {
      _id
      email
      displayName
      pictureUrl
    }
  }
}
    `;

/**
 * __useCurrentOrganizationQuery__
 *
 * To run a query within a Vue component, call `useCurrentOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentOrganizationQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useCurrentOrganizationQuery();
 */
export function useCurrentOrganizationQuery(options: VueApolloComposable.UseQueryOptions<CurrentOrganizationQuery, CurrentOrganizationQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CurrentOrganizationQuery, CurrentOrganizationQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CurrentOrganizationQuery, CurrentOrganizationQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<CurrentOrganizationQuery, CurrentOrganizationQueryVariables>(CurrentOrganizationDocument, {}, options);
}
export function useCurrentOrganizationLazyQuery(options: VueApolloComposable.UseQueryOptions<CurrentOrganizationQuery, CurrentOrganizationQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<CurrentOrganizationQuery, CurrentOrganizationQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<CurrentOrganizationQuery, CurrentOrganizationQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<CurrentOrganizationQuery, CurrentOrganizationQueryVariables>(CurrentOrganizationDocument, {}, options);
}
export type CurrentOrganizationQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<CurrentOrganizationQuery, CurrentOrganizationQueryVariables>;
export const UpdateCurrentOrganizationDocument = gql`
    mutation UpdateCurrentOrganization($input: UpdateCurrentOrganizationInput!) {
  updateCurrentOrganization(input: $input) {
    _id
    internalName
    name
  }
}
    `;

/**
 * __useUpdateCurrentOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateCurrentOrganizationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCurrentOrganizationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateCurrentOrganizationMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCurrentOrganizationMutation(options: VueApolloComposable.UseMutationOptions<UpdateCurrentOrganizationMutation, UpdateCurrentOrganizationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateCurrentOrganizationMutation, UpdateCurrentOrganizationMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateCurrentOrganizationMutation, UpdateCurrentOrganizationMutationVariables>(UpdateCurrentOrganizationDocument, options);
}
export type UpdateCurrentOrganizationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateCurrentOrganizationMutation, UpdateCurrentOrganizationMutationVariables>;
export const OrganizationsDocument = gql`
    query Organizations($query: FindOrganizationsPaginationArgs!, $sort: OrganizationsSortArgs) {
  organizations(query: $query, sort: $sort) {
    items {
      _id
      createdAt
      updatedAt
      internalName
      name
      isActive
      owner {
        _id
        email
        displayName
        pictureUrl
      }
    }
    hasNextPage
    hasPreviousPage
    page
    total
  }
}
    `;

/**
 * __useOrganizationsQuery__
 *
 * To run a query within a Vue component, call `useOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useOrganizationsQuery({
 *   query: // value for 'query'
 *   sort: // value for 'sort'
 * });
 */
export function useOrganizationsQuery(variables: OrganizationsQueryVariables | VueCompositionApi.Ref<OrganizationsQueryVariables> | ReactiveFunction<OrganizationsQueryVariables>, options: VueApolloComposable.UseQueryOptions<OrganizationsQuery, OrganizationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<OrganizationsQuery, OrganizationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<OrganizationsQuery, OrganizationsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, variables, options);
}
export function useOrganizationsLazyQuery(variables: OrganizationsQueryVariables | VueCompositionApi.Ref<OrganizationsQueryVariables> | ReactiveFunction<OrganizationsQueryVariables>, options: VueApolloComposable.UseQueryOptions<OrganizationsQuery, OrganizationsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<OrganizationsQuery, OrganizationsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<OrganizationsQuery, OrganizationsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<OrganizationsQuery, OrganizationsQueryVariables>(OrganizationsDocument, variables, options);
}
export type OrganizationsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<OrganizationsQuery, OrganizationsQueryVariables>;
export const OrganizationDocument = gql`
    query Organization($args: FindOrganizationArgs!) {
  organization(args: $args) {
    _id
    createdAt
    updatedAt
    internalName
    name
    isActive
    operationalDays
    owner {
      _id
      email
      displayName
      pictureUrl
    }
  }
}
    `;

/**
 * __useOrganizationQuery__
 *
 * To run a query within a Vue component, call `useOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useOrganizationQuery({
 *   args: // value for 'args'
 * });
 */
export function useOrganizationQuery(variables: OrganizationQueryVariables | VueCompositionApi.Ref<OrganizationQueryVariables> | ReactiveFunction<OrganizationQueryVariables>, options: VueApolloComposable.UseQueryOptions<OrganizationQuery, OrganizationQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<OrganizationQuery, OrganizationQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<OrganizationQuery, OrganizationQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, variables, options);
}
export function useOrganizationLazyQuery(variables: OrganizationQueryVariables | VueCompositionApi.Ref<OrganizationQueryVariables> | ReactiveFunction<OrganizationQueryVariables>, options: VueApolloComposable.UseQueryOptions<OrganizationQuery, OrganizationQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<OrganizationQuery, OrganizationQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<OrganizationQuery, OrganizationQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<OrganizationQuery, OrganizationQueryVariables>(OrganizationDocument, variables, options);
}
export type OrganizationQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<OrganizationQuery, OrganizationQueryVariables>;
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    _id
    internalName
    name
  }
}
    `;

/**
 * __useCreateOrganizationMutation__
 *
 * To run a mutation, you first call `useCreateOrganizationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrganizationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateOrganizationMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrganizationMutation(options: VueApolloComposable.UseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateOrganizationMutation, CreateOrganizationMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument, options);
}
export type CreateOrganizationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateOrganizationMutation, CreateOrganizationMutationVariables>;
export const UpdateOrganizationDocument = gql`
    mutation UpdateOrganization($input: UpdateOrganizationInput!) {
  updateOrganization(input: $input) {
    _id
    internalName
    name
  }
}
    `;

/**
 * __useUpdateOrganizationMutation__
 *
 * To run a mutation, you first call `useUpdateOrganizationMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrganizationMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateOrganizationMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateOrganizationMutation(options: VueApolloComposable.UseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>(UpdateOrganizationDocument, options);
}
export type UpdateOrganizationMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateOrganizationMutation, UpdateOrganizationMutationVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    _id
    email
    displayName
    firstName
    lastName
    pictureUrl
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
    query Users($query: FindUsersPaginationArgs!, $sort: UsersSortArgs) {
  users(query: $query, sort: $sort) {
    items {
      _id
      email
      createdAt
      timezone
      pictureUrl
      firstName
      displayName
      isActive
      lastName
      updatedAt
    }
    hasPreviousPage
    page
    total
    hasNextPage
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
export const UserDocument = gql`
    query User($args: FindUserArgs!) {
  user(args: $args) {
    _id
    isActive
    createdAt
    updatedAt
    firstName
    lastName
    email
    timezone
    pictureUrl
    organizationIds
    displayName
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a Vue component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useUserQuery({
 *   args: // value for 'args'
 * });
 */
export function useUserQuery(variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options);
}
export function useUserLazyQuery(variables: UserQueryVariables | VueCompositionApi.Ref<UserQueryVariables> | ReactiveFunction<UserQueryVariables>, options: VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<UserQuery, UserQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, variables, options);
}
export type UserQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<UserQuery, UserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    _id
    createdAt
    email
    firstName
    isActive
    lastName
    organizationIds
  }
}
    `;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(options: VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateUserMutation, CreateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
}
export type CreateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    _id
  }
}
    `;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateUserMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(options: VueApolloComposable.UseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
}
export type UpdateUserMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateUserMutation, UpdateUserMutationVariables>;
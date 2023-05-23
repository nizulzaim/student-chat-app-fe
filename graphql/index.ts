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

export type CreateFacultyInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  slug: Scalars['String'];
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

export type FindAllFacultiesInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type FindAllUsersInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createFaculty: Faculty;
  createUser: User;
  loginWithPassword: LoginResult;
  updateFaculty: Faculty;
};


export type MutationCreateFacultyArgs = {
  input: CreateFacultyInput;
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

export type PaginatedFaculties = {
  __typename?: 'PaginatedFaculties';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items?: Maybe<Array<Faculty>>;
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
  currentUser: User;
  faculties: PaginatedFaculties;
  faculty: Faculty;
  user: User;
  users: PaginatedUsers;
};


export type QueryFacultiesArgs = {
  query: FindAllFacultiesInput;
  sort?: InputMaybe<FacultiesSortArgs>;
};


export type QueryFacultyArgs = {
  query: FindOneFacultyInput;
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

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', _id: string, createdAt: any, email: string, firstName: string, displayName: string, isActive: boolean, lastName: string, timezone: string, updatedAt: any } };


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
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
  ObjectId: any;
  Upload: any;
};

export type Attachment = {
  __typename?: 'Attachment';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ObjectId'];
  filename: Scalars['String'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  isPublic: Scalars['Boolean'];
  key: Scalars['String'];
  mimeType: Scalars['String'];
  size: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ObjectId'];
};

export type Conversation = {
  __typename?: 'Conversation';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ObjectId'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  lastMessageAt?: Maybe<Scalars['DateTime']>;
  numberOfUnread: Scalars['Int'];
  type: ConversationType;
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ObjectId'];
  userIds: Array<Scalars['ObjectId']>;
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
  userIds: Array<Scalars['ObjectId']>;
};

export type CreateFacultyInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CreateMessageInput = {
  conversationId: Scalars['ObjectId'];
  text: Scalars['String'];
};

export type CreateSemesterInput = {
  endDate: Scalars['DateTime'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
};

export type CreateSubjectInput = {
  code: Scalars['String'];
  facultyId: Scalars['ObjectId'];
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

export type FacultiesSortArgs = {
  name?: InputMaybe<SortEnum>;
  slug?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type Faculty = {
  __typename?: 'Faculty';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ObjectId'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ObjectId'];
};

export type FindAllConversationsInput = {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  userIds?: InputMaybe<Scalars['ObjectId']>;
};

export type FindAllFacultiesInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type FindAllMessagesInput = {
  conversationId?: InputMaybe<Scalars['ObjectId']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  userIds?: InputMaybe<Scalars['ObjectId']>;
};

export type FindAllSemestersInput = {
  isActive?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
};

export type FindAllSubjectsInput = {
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
  type?: InputMaybe<UserType>;
};

export type FindOneConversationInput = {
  _id?: InputMaybe<Scalars['ObjectId']>;
};

export type FindOneFacultyInput = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type FindOneSemesterInput = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FindOneSubjectInput = {
  _id?: InputMaybe<Scalars['ObjectId']>;
  code?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type FindOneUserInput = {
  _id?: InputMaybe<Scalars['ObjectId']>;
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
  _id: Scalars['ObjectId'];
  conversationId: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ObjectId'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ObjectId'];
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
  createSemester: Semester;
  createSubject: Subject;
  createUser: User;
  downloadSignedAttachmentUrl?: Maybe<Scalars['String']>;
  loginWithPassword: LoginResult;
  updateFaculty: Faculty;
  updateSemester: Semester;
  updateSubject: Subject;
  updateSubjectAddDocument: Subject;
  uploadAttachment: Attachment;
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


export type MutationCreateSemesterArgs = {
  input: CreateSemesterInput;
};


export type MutationCreateSubjectArgs = {
  input: CreateSubjectInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDownloadSignedAttachmentUrlArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type MutationLoginWithPasswordArgs = {
  input: LoginWithPasswordInput;
};


export type MutationUpdateFacultyArgs = {
  input: UpdateFacultyInput;
};


export type MutationUpdateSemesterArgs = {
  input: UpdateSemesterInput;
};


export type MutationUpdateSubjectArgs = {
  input: UpdateSubjectInput;
};


export type MutationUpdateSubjectAddDocumentArgs = {
  input: UpdateSubjectAddDocument;
};


export type MutationUploadAttachmentArgs = {
  file: Scalars['Upload'];
};

export type PaginatedConversation = {
  __typename?: 'PaginatedConversation';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<Conversation>;
  page: Scalars['Int'];
};

export type PaginatedFaculties = {
  __typename?: 'PaginatedFaculties';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<Faculty>;
  page: Scalars['Int'];
};

export type PaginatedMessage = {
  __typename?: 'PaginatedMessage';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<Message>;
  page: Scalars['Int'];
};

export type PaginatedSemesters = {
  __typename?: 'PaginatedSemesters';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<Semester>;
  page: Scalars['Int'];
};

export type PaginatedSubjects = {
  __typename?: 'PaginatedSubjects';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<Subject>;
  page: Scalars['Int'];
};

export type PaginatedUsers = {
  __typename?: 'PaginatedUsers';
  count: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  items: Array<User>;
  page: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  conversation: Conversation;
  conversations: PaginatedConversation;
  currentUser: User;
  faculties: PaginatedFaculties;
  faculty: Faculty;
  getSignedAttachmentUrl?: Maybe<Scalars['String']>;
  messages?: Maybe<PaginatedMessage>;
  semester: Semester;
  semesters: PaginatedSemesters;
  subject?: Maybe<Subject>;
  subjects: PaginatedSubjects;
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


export type QueryGetSignedAttachmentUrlArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryMessagesArgs = {
  input: FindAllMessagesInput;
  sort: MessagesSortArgs;
};


export type QuerySemesterArgs = {
  query: FindOneSemesterInput;
};


export type QuerySemestersArgs = {
  query: FindAllSemestersInput;
  sort?: InputMaybe<SemestersSortArgs>;
};


export type QuerySubjectArgs = {
  query: FindOneSubjectInput;
};


export type QuerySubjectsArgs = {
  query: FindAllSubjectsInput;
  sort?: InputMaybe<SubjectsSortArgs>;
};


export type QueryUserArgs = {
  query: FindOneUserInput;
};


export type QueryUsersArgs = {
  query: FindAllUsersInput;
  sort?: InputMaybe<UsersSortArgs>;
};

export type Semester = {
  __typename?: 'Semester';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ObjectId'];
  endDate: Scalars['DateTime'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  name: Scalars['String'];
  startDate: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ObjectId'];
};

export type SemestersSortArgs = {
  code?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export enum SortEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Subject = {
  __typename?: 'Subject';
  _id: Scalars['ObjectId'];
  code: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ObjectId'];
  faculty: Faculty;
  facultyId: Scalars['ObjectId'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ObjectId'];
  weekAttachments?: Maybe<Array<WeekDocument>>;
};

export type SubjectsSortArgs = {
  code?: InputMaybe<SortEnum>;
  name?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

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
  _id: Scalars['ObjectId'];
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  slug?: InputMaybe<Scalars['String']>;
};

export type UpdateSemesterInput = {
  _id: Scalars['ObjectId'];
  endDate?: InputMaybe<Scalars['DateTime']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['DateTime']>;
};

export type UpdateSubjectAddDocument = {
  _id: Scalars['ObjectId'];
  attachmentId: Scalars['ObjectId'];
  name: Scalars['String'];
  week: Scalars['Int'];
};

export type UpdateSubjectInput = {
  _id: Scalars['ObjectId'];
  code?: InputMaybe<Scalars['String']>;
  facultyId?: InputMaybe<Scalars['ObjectId']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  createdById: Scalars['ObjectId'];
  displayName: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  isActive: Scalars['Boolean'];
  isDeleted: Scalars['Boolean'];
  lastName: Scalars['String'];
  timezone: Scalars['String'];
  type: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  updatedBy: User;
  updatedById: Scalars['ObjectId'];
};

export type UserMeta = {
  __typename?: 'UserMeta';
  lastReadAt: Scalars['DateTime'];
  userId: Array<Scalars['ObjectId']>;
};

export enum UserType {
  Admin = 'ADMIN',
  Lecturer = 'LECTURER',
  Student = 'STUDENT'
}

export type UsersSortArgs = {
  email?: InputMaybe<SortEnum>;
  firstName?: InputMaybe<SortEnum>;
  lastName?: InputMaybe<SortEnum>;
  updatedAt?: InputMaybe<SortEnum>;
};

export type WeekDocument = {
  __typename?: 'WeekDocument';
  attachmentId: Scalars['ObjectId'];
  attachmentInfo: Attachment;
  createdAt: Scalars['DateTime'];
  createdBy: User;
  name: Scalars['String'];
  updatedBy: User;
  week: Scalars['Int'];
};

export type FacultiesQueryVariables = Exact<{
  query: FindAllFacultiesInput;
  sort?: InputMaybe<FacultiesSortArgs>;
}>;


export type FacultiesQuery = { __typename?: 'Query', faculties: { __typename?: 'PaginatedFaculties', count: number, hasNextPage: boolean, hasPreviousPage: boolean, page: number, items: Array<{ __typename?: 'Faculty', _id: any, updatedAt: any, name: string, isActive: boolean }> } };

export type FacultyQueryVariables = Exact<{
  query: FindOneFacultyInput;
}>;


export type FacultyQuery = { __typename?: 'Query', faculty: { __typename?: 'Faculty', _id: any, createdAt: any, updatedAt: any, slug: string, name: string, isActive: boolean } };

export type CreateFacultyMutationVariables = Exact<{
  input: CreateFacultyInput;
}>;


export type CreateFacultyMutation = { __typename?: 'Mutation', createFaculty: { __typename?: 'Faculty', _id: any } };

export type UpdateFacultyMutationVariables = Exact<{
  input: UpdateFacultyInput;
}>;


export type UpdateFacultyMutation = { __typename?: 'Mutation', updateFaculty: { __typename?: 'Faculty', _id: any } };

export type SemestersQueryVariables = Exact<{
  query: FindAllSemestersInput;
  sort?: InputMaybe<SemestersSortArgs>;
}>;


export type SemestersQuery = { __typename?: 'Query', semesters: { __typename?: 'PaginatedSemesters', count: number, hasNextPage: boolean, hasPreviousPage: boolean, page: number, items: Array<{ __typename?: 'Semester', _id: any, updatedAt: any, name: string, startDate: any, endDate: any, isActive: boolean }> } };

export type SemesterQueryVariables = Exact<{
  query: FindOneSemesterInput;
}>;


export type SemesterQuery = { __typename?: 'Query', semester: { __typename?: 'Semester', _id: any, createdAt: any, updatedAt: any, name: string, startDate: any, endDate: any, isActive: boolean } };

export type CreateSemesterMutationVariables = Exact<{
  input: CreateSemesterInput;
}>;


export type CreateSemesterMutation = { __typename?: 'Mutation', createSemester: { __typename?: 'Semester', _id: any } };

export type UpdateSemesterMutationVariables = Exact<{
  input: UpdateSemesterInput;
}>;


export type UpdateSemesterMutation = { __typename?: 'Mutation', updateSemester: { __typename?: 'Semester', _id: any } };

export type SubjectsQueryVariables = Exact<{
  query: FindAllSubjectsInput;
  sort?: InputMaybe<SubjectsSortArgs>;
}>;


export type SubjectsQuery = { __typename?: 'Query', subjects: { __typename?: 'PaginatedSubjects', count: number, hasNextPage: boolean, hasPreviousPage: boolean, page: number, items: Array<{ __typename?: 'Subject', _id: any, updatedAt: any, name: string, code: string, facultyId: any, isActive: boolean, faculty: { __typename?: 'Faculty', name: string, isActive: boolean } }> } };

export type SubjectQueryVariables = Exact<{
  query: FindOneSubjectInput;
}>;


export type SubjectQuery = { __typename?: 'Query', subject?: { __typename?: 'Subject', _id: any, createdAt: any, updatedAt: any, name: string, code: string, facultyId: any, isActive: boolean, faculty: { __typename?: 'Faculty', name: string, isActive: boolean }, weekAttachments?: Array<{ __typename?: 'WeekDocument', attachmentId: any, name: string, week: number, createdAt: any, attachmentInfo: { __typename?: 'Attachment', size: number, mimeType: string, filename: string, createdBy: { __typename?: 'User', displayName: string } } }> | null } | null };

export type CreateSubjectMutationVariables = Exact<{
  input: CreateSubjectInput;
}>;


export type CreateSubjectMutation = { __typename?: 'Mutation', createSubject: { __typename?: 'Subject', _id: any } };

export type UpdateSubjectMutationVariables = Exact<{
  input: UpdateSubjectInput;
}>;


export type UpdateSubjectMutation = { __typename?: 'Mutation', updateSubject: { __typename?: 'Subject', _id: any } };

export type UpdateSubjectAddDocumentMutationVariables = Exact<{
  input: UpdateSubjectAddDocument;
}>;


export type UpdateSubjectAddDocumentMutation = { __typename?: 'Mutation', updateSubjectAddDocument: { __typename?: 'Subject', _id: any } };

export type UploadAttachmentMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadAttachmentMutation = { __typename?: 'Mutation', uploadAttachment: { __typename?: 'Attachment', _id: any, createdAt: any, filename: string, isActive: boolean, key: string, mimeType: string, size: number, updatedAt: any } };

export type GetSignedAttachmentUrlQueryVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type GetSignedAttachmentUrlQuery = { __typename?: 'Query', getSignedAttachmentUrl?: string | null };

export type DownloadSignedAttachmentUrlMutationVariables = Exact<{
  id?: InputMaybe<Scalars['String']>;
}>;


export type DownloadSignedAttachmentUrlMutation = { __typename?: 'Mutation', downloadSignedAttachmentUrl?: string | null };

export type LoginWithPasswordMutationVariables = Exact<{
  input: LoginWithPasswordInput;
}>;


export type LoginWithPasswordMutation = { __typename?: 'Mutation', loginWithPassword: { __typename?: 'LoginResult', token: string, user: { __typename?: 'User', _id: any } } };

export type ConversationsQueryVariables = Exact<{
  input: FindAllConversationsInput;
  sort: ConversationsSortArgs;
}>;


export type ConversationsQuery = { __typename?: 'Query', conversations: { __typename?: 'PaginatedConversation', items: Array<{ __typename?: 'Conversation', _id: any, type: ConversationType, numberOfUnread: number, users: Array<{ __typename?: 'User', _id: any, displayName: string, email: string }> }> } };

export type CreateConversationMutationVariables = Exact<{
  input: CreateConversationInput;
}>;


export type CreateConversationMutation = { __typename?: 'Mutation', createConversation: { __typename?: 'Conversation', _id: any } };

export type ConversationUpdatedSubscriptionVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ConversationUpdatedSubscription = { __typename?: 'Subscription', conversationUpdated: { __typename?: 'Conversation', _id: any } };

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage: { __typename?: 'Message', _id: any, text: string, createdById: any } };

export type MessagesQueryVariables = Exact<{
  input: FindAllMessagesInput;
  sort: MessagesSortArgs;
}>;


export type MessagesQuery = { __typename?: 'Query', messages?: { __typename?: 'PaginatedMessage', count: number, hasNextPage: boolean, hasPreviousPage: boolean, page: number, items: Array<{ __typename?: 'Message', _id: any, createdAt: any, createdById: any, text: string, conversationId: any, createdBy: { __typename?: 'User', email: string, displayName: string } }> } | null };

export type MessageAddedSubscriptionVariables = Exact<{
  conversationId: Scalars['String'];
}>;


export type MessageAddedSubscription = { __typename?: 'Subscription', messageAdded: { __typename?: 'Message', _id: any, createdAt: any, createdById: any, text: string, conversationId: any, createdBy: { __typename?: 'User', email: string, displayName: string } } };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', _id: any, createdAt: any, email: string, firstName: string, displayName: string, isActive: boolean, lastName: string, timezone: string, updatedAt: any, type: string } };

export type UsersQueryVariables = Exact<{
  query: FindAllUsersInput;
  sort?: InputMaybe<UsersSortArgs>;
}>;


export type UsersQuery = { __typename?: 'Query', users: { __typename?: 'PaginatedUsers', count: number, hasNextPage: boolean, hasPreviousPage: boolean, items: Array<{ __typename?: 'User', _id: any, displayName: string, email: string, type: string }> } };


export const FacultiesDocument = gql`
    query Faculties($query: FindAllFacultiesInput!, $sort: FacultiesSortArgs) {
  faculties(query: $query, sort: $sort) {
    items {
      _id
      updatedAt
      name
      isActive
    }
    count
    hasNextPage
    hasPreviousPage
    page
  }
}
    `;

/**
 * __useFacultiesQuery__
 *
 * To run a query within a Vue component, call `useFacultiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFacultiesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFacultiesQuery({
 *   query: // value for 'query'
 *   sort: // value for 'sort'
 * });
 */
export function useFacultiesQuery(variables: FacultiesQueryVariables | VueCompositionApi.Ref<FacultiesQueryVariables> | ReactiveFunction<FacultiesQueryVariables>, options: VueApolloComposable.UseQueryOptions<FacultiesQuery, FacultiesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FacultiesQuery, FacultiesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FacultiesQuery, FacultiesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, variables, options);
}
export function useFacultiesLazyQuery(variables: FacultiesQueryVariables | VueCompositionApi.Ref<FacultiesQueryVariables> | ReactiveFunction<FacultiesQueryVariables>, options: VueApolloComposable.UseQueryOptions<FacultiesQuery, FacultiesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FacultiesQuery, FacultiesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FacultiesQuery, FacultiesQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FacultiesQuery, FacultiesQueryVariables>(FacultiesDocument, variables, options);
}
export type FacultiesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FacultiesQuery, FacultiesQueryVariables>;
export const FacultyDocument = gql`
    query Faculty($query: FindOneFacultyInput!) {
  faculty(query: $query) {
    _id
    createdAt
    updatedAt
    slug
    name
    isActive
  }
}
    `;

/**
 * __useFacultyQuery__
 *
 * To run a query within a Vue component, call `useFacultyQuery` and pass it any options that fit your needs.
 * When your component renders, `useFacultyQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useFacultyQuery({
 *   query: // value for 'query'
 * });
 */
export function useFacultyQuery(variables: FacultyQueryVariables | VueCompositionApi.Ref<FacultyQueryVariables> | ReactiveFunction<FacultyQueryVariables>, options: VueApolloComposable.UseQueryOptions<FacultyQuery, FacultyQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FacultyQuery, FacultyQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FacultyQuery, FacultyQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<FacultyQuery, FacultyQueryVariables>(FacultyDocument, variables, options);
}
export function useFacultyLazyQuery(variables: FacultyQueryVariables | VueCompositionApi.Ref<FacultyQueryVariables> | ReactiveFunction<FacultyQueryVariables>, options: VueApolloComposable.UseQueryOptions<FacultyQuery, FacultyQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<FacultyQuery, FacultyQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<FacultyQuery, FacultyQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<FacultyQuery, FacultyQueryVariables>(FacultyDocument, variables, options);
}
export type FacultyQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<FacultyQuery, FacultyQueryVariables>;
export const CreateFacultyDocument = gql`
    mutation CreateFaculty($input: CreateFacultyInput!) {
  createFaculty(input: $input) {
    _id
  }
}
    `;

/**
 * __useCreateFacultyMutation__
 *
 * To run a mutation, you first call `useCreateFacultyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateFacultyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateFacultyMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateFacultyMutation(options: VueApolloComposable.UseMutationOptions<CreateFacultyMutation, CreateFacultyMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateFacultyMutation, CreateFacultyMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateFacultyMutation, CreateFacultyMutationVariables>(CreateFacultyDocument, options);
}
export type CreateFacultyMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateFacultyMutation, CreateFacultyMutationVariables>;
export const UpdateFacultyDocument = gql`
    mutation UpdateFaculty($input: UpdateFacultyInput!) {
  updateFaculty(input: $input) {
    _id
  }
}
    `;

/**
 * __useUpdateFacultyMutation__
 *
 * To run a mutation, you first call `useUpdateFacultyMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFacultyMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateFacultyMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateFacultyMutation(options: VueApolloComposable.UseMutationOptions<UpdateFacultyMutation, UpdateFacultyMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateFacultyMutation, UpdateFacultyMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateFacultyMutation, UpdateFacultyMutationVariables>(UpdateFacultyDocument, options);
}
export type UpdateFacultyMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateFacultyMutation, UpdateFacultyMutationVariables>;
export const SemestersDocument = gql`
    query Semesters($query: FindAllSemestersInput!, $sort: SemestersSortArgs) {
  semesters(query: $query, sort: $sort) {
    items {
      _id
      updatedAt
      name
      startDate
      endDate
      isActive
    }
    count
    hasNextPage
    hasPreviousPage
    page
  }
}
    `;

/**
 * __useSemestersQuery__
 *
 * To run a query within a Vue component, call `useSemestersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSemestersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSemestersQuery({
 *   query: // value for 'query'
 *   sort: // value for 'sort'
 * });
 */
export function useSemestersQuery(variables: SemestersQueryVariables | VueCompositionApi.Ref<SemestersQueryVariables> | ReactiveFunction<SemestersQueryVariables>, options: VueApolloComposable.UseQueryOptions<SemestersQuery, SemestersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SemestersQuery, SemestersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SemestersQuery, SemestersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, variables, options);
}
export function useSemestersLazyQuery(variables: SemestersQueryVariables | VueCompositionApi.Ref<SemestersQueryVariables> | ReactiveFunction<SemestersQueryVariables>, options: VueApolloComposable.UseQueryOptions<SemestersQuery, SemestersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SemestersQuery, SemestersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SemestersQuery, SemestersQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<SemestersQuery, SemestersQueryVariables>(SemestersDocument, variables, options);
}
export type SemestersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SemestersQuery, SemestersQueryVariables>;
export const SemesterDocument = gql`
    query Semester($query: FindOneSemesterInput!) {
  semester(query: $query) {
    _id
    createdAt
    updatedAt
    name
    startDate
    endDate
    isActive
  }
}
    `;

/**
 * __useSemesterQuery__
 *
 * To run a query within a Vue component, call `useSemesterQuery` and pass it any options that fit your needs.
 * When your component renders, `useSemesterQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSemesterQuery({
 *   query: // value for 'query'
 * });
 */
export function useSemesterQuery(variables: SemesterQueryVariables | VueCompositionApi.Ref<SemesterQueryVariables> | ReactiveFunction<SemesterQueryVariables>, options: VueApolloComposable.UseQueryOptions<SemesterQuery, SemesterQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SemesterQuery, SemesterQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SemesterQuery, SemesterQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SemesterQuery, SemesterQueryVariables>(SemesterDocument, variables, options);
}
export function useSemesterLazyQuery(variables: SemesterQueryVariables | VueCompositionApi.Ref<SemesterQueryVariables> | ReactiveFunction<SemesterQueryVariables>, options: VueApolloComposable.UseQueryOptions<SemesterQuery, SemesterQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SemesterQuery, SemesterQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SemesterQuery, SemesterQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<SemesterQuery, SemesterQueryVariables>(SemesterDocument, variables, options);
}
export type SemesterQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SemesterQuery, SemesterQueryVariables>;
export const CreateSemesterDocument = gql`
    mutation CreateSemester($input: CreateSemesterInput!) {
  createSemester(input: $input) {
    _id
  }
}
    `;

/**
 * __useCreateSemesterMutation__
 *
 * To run a mutation, you first call `useCreateSemesterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateSemesterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateSemesterMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateSemesterMutation(options: VueApolloComposable.UseMutationOptions<CreateSemesterMutation, CreateSemesterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateSemesterMutation, CreateSemesterMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateSemesterMutation, CreateSemesterMutationVariables>(CreateSemesterDocument, options);
}
export type CreateSemesterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateSemesterMutation, CreateSemesterMutationVariables>;
export const UpdateSemesterDocument = gql`
    mutation UpdateSemester($input: UpdateSemesterInput!) {
  updateSemester(input: $input) {
    _id
  }
}
    `;

/**
 * __useUpdateSemesterMutation__
 *
 * To run a mutation, you first call `useUpdateSemesterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSemesterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateSemesterMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSemesterMutation(options: VueApolloComposable.UseMutationOptions<UpdateSemesterMutation, UpdateSemesterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateSemesterMutation, UpdateSemesterMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateSemesterMutation, UpdateSemesterMutationVariables>(UpdateSemesterDocument, options);
}
export type UpdateSemesterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateSemesterMutation, UpdateSemesterMutationVariables>;
export const SubjectsDocument = gql`
    query Subjects($query: FindAllSubjectsInput!, $sort: SubjectsSortArgs) {
  subjects(query: $query, sort: $sort) {
    items {
      _id
      updatedAt
      name
      code
      facultyId
      faculty {
        name
        isActive
      }
      isActive
    }
    count
    hasNextPage
    hasPreviousPage
    page
  }
}
    `;

/**
 * __useSubjectsQuery__
 *
 * To run a query within a Vue component, call `useSubjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSubjectsQuery({
 *   query: // value for 'query'
 *   sort: // value for 'sort'
 * });
 */
export function useSubjectsQuery(variables: SubjectsQueryVariables | VueCompositionApi.Ref<SubjectsQueryVariables> | ReactiveFunction<SubjectsQueryVariables>, options: VueApolloComposable.UseQueryOptions<SubjectsQuery, SubjectsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SubjectsQuery, SubjectsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SubjectsQuery, SubjectsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, variables, options);
}
export function useSubjectsLazyQuery(variables: SubjectsQueryVariables | VueCompositionApi.Ref<SubjectsQueryVariables> | ReactiveFunction<SubjectsQueryVariables>, options: VueApolloComposable.UseQueryOptions<SubjectsQuery, SubjectsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SubjectsQuery, SubjectsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SubjectsQuery, SubjectsQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<SubjectsQuery, SubjectsQueryVariables>(SubjectsDocument, variables, options);
}
export type SubjectsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SubjectsQuery, SubjectsQueryVariables>;
export const SubjectDocument = gql`
    query Subject($query: FindOneSubjectInput!) {
  subject(query: $query) {
    _id
    createdAt
    updatedAt
    name
    faculty {
      name
      isActive
    }
    weekAttachments {
      attachmentId
      name
      week
      createdAt
      attachmentInfo {
        size
        mimeType
        filename
        createdBy {
          displayName
        }
      }
    }
    code
    facultyId
    isActive
  }
}
    `;

/**
 * __useSubjectQuery__
 *
 * To run a query within a Vue component, call `useSubjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useSubjectQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSubjectQuery({
 *   query: // value for 'query'
 * });
 */
export function useSubjectQuery(variables: SubjectQueryVariables | VueCompositionApi.Ref<SubjectQueryVariables> | ReactiveFunction<SubjectQueryVariables>, options: VueApolloComposable.UseQueryOptions<SubjectQuery, SubjectQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SubjectQuery, SubjectQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SubjectQuery, SubjectQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, variables, options);
}
export function useSubjectLazyQuery(variables: SubjectQueryVariables | VueCompositionApi.Ref<SubjectQueryVariables> | ReactiveFunction<SubjectQueryVariables>, options: VueApolloComposable.UseQueryOptions<SubjectQuery, SubjectQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SubjectQuery, SubjectQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SubjectQuery, SubjectQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<SubjectQuery, SubjectQueryVariables>(SubjectDocument, variables, options);
}
export type SubjectQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SubjectQuery, SubjectQueryVariables>;
export const CreateSubjectDocument = gql`
    mutation CreateSubject($input: CreateSubjectInput!) {
  createSubject(input: $input) {
    _id
  }
}
    `;

/**
 * __useCreateSubjectMutation__
 *
 * To run a mutation, you first call `useCreateSubjectMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateSubjectMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateSubjectMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useCreateSubjectMutation(options: VueApolloComposable.UseMutationOptions<CreateSubjectMutation, CreateSubjectMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateSubjectMutation, CreateSubjectMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<CreateSubjectMutation, CreateSubjectMutationVariables>(CreateSubjectDocument, options);
}
export type CreateSubjectMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateSubjectMutation, CreateSubjectMutationVariables>;
export const UpdateSubjectDocument = gql`
    mutation UpdateSubject($input: UpdateSubjectInput!) {
  updateSubject(input: $input) {
    _id
  }
}
    `;

/**
 * __useUpdateSubjectMutation__
 *
 * To run a mutation, you first call `useUpdateSubjectMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubjectMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateSubjectMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSubjectMutation(options: VueApolloComposable.UseMutationOptions<UpdateSubjectMutation, UpdateSubjectMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateSubjectMutation, UpdateSubjectMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateSubjectMutation, UpdateSubjectMutationVariables>(UpdateSubjectDocument, options);
}
export type UpdateSubjectMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateSubjectMutation, UpdateSubjectMutationVariables>;
export const UpdateSubjectAddDocumentDocument = gql`
    mutation UpdateSubjectAddDocument($input: UpdateSubjectAddDocument!) {
  updateSubjectAddDocument(input: $input) {
    _id
  }
}
    `;

/**
 * __useUpdateSubjectAddDocumentMutation__
 *
 * To run a mutation, you first call `useUpdateSubjectAddDocumentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSubjectAddDocumentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateSubjectAddDocumentMutation({
 *   variables: {
 *     input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSubjectAddDocumentMutation(options: VueApolloComposable.UseMutationOptions<UpdateSubjectAddDocumentMutation, UpdateSubjectAddDocumentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateSubjectAddDocumentMutation, UpdateSubjectAddDocumentMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UpdateSubjectAddDocumentMutation, UpdateSubjectAddDocumentMutationVariables>(UpdateSubjectAddDocumentDocument, options);
}
export type UpdateSubjectAddDocumentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateSubjectAddDocumentMutation, UpdateSubjectAddDocumentMutationVariables>;
export const UploadAttachmentDocument = gql`
    mutation UploadAttachment($file: Upload!) {
  uploadAttachment(file: $file) {
    _id
    createdAt
    filename
    isActive
    key
    mimeType
    size
    updatedAt
  }
}
    `;

/**
 * __useUploadAttachmentMutation__
 *
 * To run a mutation, you first call `useUploadAttachmentMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUploadAttachmentMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUploadAttachmentMutation({
 *   variables: {
 *     file: // value for 'file'
 *   },
 * });
 */
export function useUploadAttachmentMutation(options: VueApolloComposable.UseMutationOptions<UploadAttachmentMutation, UploadAttachmentMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UploadAttachmentMutation, UploadAttachmentMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<UploadAttachmentMutation, UploadAttachmentMutationVariables>(UploadAttachmentDocument, options);
}
export type UploadAttachmentMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UploadAttachmentMutation, UploadAttachmentMutationVariables>;
export const GetSignedAttachmentUrlDocument = gql`
    query GetSignedAttachmentUrl($id: String) {
  getSignedAttachmentUrl(id: $id)
}
    `;

/**
 * __useGetSignedAttachmentUrlQuery__
 *
 * To run a query within a Vue component, call `useGetSignedAttachmentUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSignedAttachmentUrlQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetSignedAttachmentUrlQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetSignedAttachmentUrlQuery(variables: GetSignedAttachmentUrlQueryVariables | VueCompositionApi.Ref<GetSignedAttachmentUrlQueryVariables> | ReactiveFunction<GetSignedAttachmentUrlQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables>(GetSignedAttachmentUrlDocument, variables, options);
}
export function useGetSignedAttachmentUrlLazyQuery(variables: GetSignedAttachmentUrlQueryVariables | VueCompositionApi.Ref<GetSignedAttachmentUrlQueryVariables> | ReactiveFunction<GetSignedAttachmentUrlQueryVariables> = {}, options: VueApolloComposable.UseQueryOptions<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables>(GetSignedAttachmentUrlDocument, variables, options);
}
export type GetSignedAttachmentUrlQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetSignedAttachmentUrlQuery, GetSignedAttachmentUrlQueryVariables>;
export const DownloadSignedAttachmentUrlDocument = gql`
    mutation DownloadSignedAttachmentUrl($id: String) {
  downloadSignedAttachmentUrl(id: $id)
}
    `;

/**
 * __useDownloadSignedAttachmentUrlMutation__
 *
 * To run a mutation, you first call `useDownloadSignedAttachmentUrlMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useDownloadSignedAttachmentUrlMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useDownloadSignedAttachmentUrlMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useDownloadSignedAttachmentUrlMutation(options: VueApolloComposable.UseMutationOptions<DownloadSignedAttachmentUrlMutation, DownloadSignedAttachmentUrlMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<DownloadSignedAttachmentUrlMutation, DownloadSignedAttachmentUrlMutationVariables>> = {}) {
  return VueApolloComposable.useMutation<DownloadSignedAttachmentUrlMutation, DownloadSignedAttachmentUrlMutationVariables>(DownloadSignedAttachmentUrlDocument, options);
}
export type DownloadSignedAttachmentUrlMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<DownloadSignedAttachmentUrlMutation, DownloadSignedAttachmentUrlMutationVariables>;
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
    type
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
      type
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
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const inctagramApi = createApi({
  reducerPath: 'inctagramApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/v1/' }),
  endpoints: (builder) => ({
    getPostById: builder.query({
      query: (postId) => `posts/id/${postId}`,
    }),
  }),
})

export const { useGetPostByIdQuery } = inctagramApi;

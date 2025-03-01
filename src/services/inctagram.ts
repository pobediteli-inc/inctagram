import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const inctagramApi = createApi({
  reducerPath: 'inctagramApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://inctagram.work/api/v1/' }),
  endpoints: () => ({}),
})

export const {} = inctagramApi;

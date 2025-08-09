import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse } from '../types/types';

const fallbackImage =
  'https://img.freepik.com/premium-vector/shades-gray-scale-color-palette-vector-illustration-eps-10_213497-3330.jpg?semt=ais_hybrid&w=740';

export const api = createApi({
  reducerPath: 'endpointApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.artic.edu/api/v1/',
  }),
  endpoints: (build) => ({
    getConfigEndpoint: build.query<string, void>({
      query: () => ({ url: 'artworks' }),
      transformResponse: (response: ApiResponse) => response.config.iiif_url,
    }),
    getImages: build.query<string[], number[]>({
      async queryFn(ids, _api, _extraOptions, baseQuery) {
        const configEndpoint = await baseQuery({ url: 'artworks' });
        if (configEndpoint.error) {
          return { error: configEndpoint.error };
        }

        const configUrl = (configEndpoint.data as ApiResponse).config.iiif_url;

        if (ids.length === 0) {
          return { data: [fallbackImage] };
        }

        const urls = ids.map((id) => {
          const rawUrl = `${configUrl}/${id}/full/400,/0/default.jpg`;
          const proxiedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
            rawUrl.replace(/^https?:\/\//, '')
          )}`;
          return proxiedUrl;
        });

        return { data: urls };
      },
    }),
  }),
});

export const { useGetConfigEndpointQuery, useGetImagesQuery } = api;

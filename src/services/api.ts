import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { ApiResponse, ArtworkResponse, Data } from '../types/types';

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
    getImages: build.query<string[], { ids: number[]; configUrl: string }>({
      queryFn({ ids, configUrl }) {
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
    getArtworkById: build.query<Data, { id: string; configUrl: string }>({
      async queryFn({ id, configUrl }, _api, _extraOptions, baseQuery) {
        const response = await baseQuery({
          url: `/artworks/${id}`,
        });

        if (response.error) {
          return { error: response.error };
        }

        const data = (response.data as ArtworkResponse).data;
        if (!data) {
          return { error: { status: 'CUSTOM_ERROR', error: 'No data' } };
        }

        const image_id = (response.data as ArtworkResponse).data.image_id;

        const rawUrl = `${configUrl}/${image_id}/full/400,/0/default.jpg`;
        const proxiedUrl = `https://images.weserv.nl/?url=${encodeURIComponent(
          rawUrl.replace(/^https?:\/\//, '')
        )}`;

        return {
          data: {
            title: data.title,
            artist_display: data.artist_display,
            description: data.description,
            proxiedUrl,
            place_of_origin: data.place_of_origin,
          },
        };
      },
    }),
  }),
});

export const {
  useGetConfigEndpointQuery,
  useGetImagesQuery,
  useGetArtworkByIdQuery,
} = api;

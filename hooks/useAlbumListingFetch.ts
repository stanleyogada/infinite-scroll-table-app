import React, { useCallback } from "react";
import { Album, getAllAlbum } from "services/album";
import useFetch, { Resource } from "./useFetch";

type AlbumHookReturnValue = {
  albums: Resource<Album[]>;
  handleFetch: ({
    // page,
    limit,
    title,
  }: {
    // page: number;
    limit?: number;
    title?: string;
  }) => Promise<void>;
};

const useAlbumListingFetch = (): AlbumHookReturnValue => {
  const { resource, setResource, handleFetchResource } = useFetch<Album[]>();

  const handleFetch = useCallback(
    async ({
      // page,
      limit,
      title,
    }: {
      // page: number;
      limit?: number;
      title?: string;
    }) => {
      await handleFetchResource({
        fetcher: async () => {
          let { data } = await getAllAlbum();

          if (title) {
            data = data.filter((album) => {
              if (album.title.toLowerCase().includes(title.toLowerCase())) {
                return true;
              }
            });
          } else if (limit) {
            const startIndex = 0;
            const endIndex = startIndex + limit;

            data = data.slice(startIndex, endIndex);
          }
          // const startIndex = (page - 1) * limit;

          return data;
        },
      });
    },
    [handleFetchResource]
  );

  return {
    albums: resource,
    handleFetch,
  };
};

export default useAlbumListingFetch;

import type { NextPage } from "next";
import { Box, Heading } from "@chakra-ui/react";
import DataTable from "components/DataTable/DataTable";
import useAlbumListingFetch from "hooks/useAlbumListingFetch";
import React from "react";
import useTableInfiniteScroll from "hooks/useTableInfiniteScroll";

const HomePage: NextPage = () => {
  const {
    limit,
    filterInputValue,
    shouldFilterRows,
    handleInfiniteScroll,
    handleFilterInputChange,
    handleShouldFilterRowsChange,
  } = useTableInfiniteScroll();

  const { albums, handleFetch } = useAlbumListingFetch();

  React.useEffect(() => {
    handleFetch({ limit });
  }, [handleFetch, limit]);

  React.useEffect(() => {
    if (shouldFilterRows) {
      console.log("shouldFilterRows", shouldFilterRows);
      (async () => {
        await handleFetch(filterInputValue ? { title: filterInputValue } : {});

        handleShouldFilterRowsChange(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFetch, handleShouldFilterRowsChange, shouldFilterRows]);

  const albumsData = albums.data || [];

  return (
    <Box maxLength="700px" mx="auto" p={10}>
      {/* @ts-ignore */}
      <Heading as="h1" mb={10}>
        Infinite Scroll Table
      </Heading>

      <DataTable
        // SPECIFICATIONs Props
        columns={[
          {
            id: "albumId",
            label: "Album Id",
            width: "100px",
            numeric: true,
          },
          {
            id: "title",
            label: "Title",
            width: "3fr",
          },
          {
            id: "price",
            label: "Price",
          },
        ]}
        rows={albumsData}
        filterInputValue={filterInputValue}
        onRowClick={(row, index) => {
          console.log(row, index);
        }}
        onSelectionChange={(selectedRows) => {
          console.log(selectedRows);
        }}
        hasError={albums.error}
        onErrorRetry={() => handleFetch({ limit })}
        // Props To Provision infinite scroll
        isLoading={albums.loading}
        onLastRowIsVisible={() => {
          !filterInputValue && handleInfiniteScroll();
        }}
        onFilterInputChange={handleFilterInputChange}
        onShouldFilterRowsChange={handleShouldFilterRowsChange}
      />
    </Box>
  );
};

export default HomePage;

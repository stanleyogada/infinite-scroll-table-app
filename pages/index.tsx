import type { NextPage } from "next";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";
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
      <Flex mb={10} justifyContent="space-between" alignItems="center">
        <Heading as="h1">Infinite Scroll Table</Heading>

        <Box mt={10} textAlign="right" fontSize="sm" color="gray.500">
          <Box as="p" fontSize={"smaller"}>
            &copy; {new Date().getFullYear()} Infinite Scroll Table. All rights
            reserved.
          </Box>

          <p>
            Built with{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            by{" "}
            <Link
              color="brand.blue"
              textDecoration="underline"
              href="https://www.linkedin.com/in/stanley-ogada/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Stanley Ogada (RichCode)
            </Link>
          </p>
        </Box>
      </Flex>

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

      <Box
        as="footer"
        mt={10}
        textAlign="center"
        fontSize="sm"
        color="gray.500"
      >
        <Box as="p" fontSize={"smaller"}>
          &copy; {new Date().getFullYear()} Infinite Scroll Table. All rights
          reserved.
        </Box>

        <p>
          Built with{" "}
          <span role="img" aria-label="love">
            ❤️
          </span>{" "}
          by{" "}
          <Link
            color="brand.blue"
            textDecoration="underline"
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Stanley Ogada (RichCode)
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default HomePage;

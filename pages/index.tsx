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
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Infinite Scroll Table</title>
        <meta
          name="description"
          content={`
          Experience the seamless implementation of infinite scrolling with our demo app. Designed to showcase the expertise in handling large datasets and enhancing user experience, this app demonstrates the flawless integration of the infinite scrolling feature in a list of fetched data. Explore the smooth and continuous flow of content, as the app dynamically loads new data as you scroll. Witness the efficiency and performance of our implementation, providing a glimpse into the possibilities of optimized browsing and navigation. Discover the power of infinite scrolling firsthand with our impressive demo app.
          `}
        />
        <meta
          name="keywords"
          content="frontend, web, developer, engineer, next, nextjs, react, html, css, javascript, Es6, React.js, Next.js, Redux, Jest, React-Testing-Library, Cypress, Axios, React-Query, Chart.js, Material-UI, Chakra-UI, Bootstrap, TailwindCSS, Webpack, Story-book, Vite, Git, Github, BitBucket, Node.js, NPM, Express.js, MongoDB, PostgreSQL, Heroku, Vercel, Slack, Jira, Google Meets, Sentry, Trello, Travis-CI, Circle-CI, Split.IO, Backend, full-stack, remote, job, open, visa, sponsorship, lagos, nigeria, Nigerian, US, UnitedStates, feature, Agile, Test, Infinite, Scroll, Animation"
        />
        <meta name="author" content="Stanley Ogada" />
        <meta name="image" property="og:image" content="/infinite-scroll.png" />
        <meta
          name="url"
          property="og:url"
          content="https://infinite-scroll-table-app.vercel.app/"
        />
      </head>

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

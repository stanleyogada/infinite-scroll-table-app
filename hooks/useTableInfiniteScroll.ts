import React, { useCallback } from "react";

const useTableInfiniteScroll = (): {
  limit: number;
  filterInputValue: string;
  shouldFilterRows: boolean;
  handleInfiniteScroll: () => void;
  handleLimitChange: (newLimit: number) => void;
  handleFilterInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleShouldFilterRowsChange: (newShouldFilterRows: boolean) => void;
} => {
  const [filterInputValue, setFilterInputValue] = React.useState<string>("");
  const [shouldFilterRows, setShouldFilterRows] =
    React.useState<boolean>(false);

  // const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState<number>(50);

  // Will setLimit and trigger a new fetch, Thus infinite scroll will be simulated
  const handleInfiniteScroll = () => {
    if (filterInputValue) {
      setLimit(10000);
      return;
    }

    setLimit((prevLimit) => prevLimit + 50);
  };

  const handleLimitChange = (newLimit: number): void => {
    setLimit(newLimit);
  };

  const handleFilterInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handleFilterInputChange", e.target.value);

    setFilterInputValue(e.target.value);
  };

  const handleShouldFilterRowsChange = useCallback(
    (newShouldFilterRows: boolean) => {
      setShouldFilterRows(newShouldFilterRows);
    },
    []
  );

  return {
    limit,
    filterInputValue,
    shouldFilterRows,
    handleInfiniteScroll,
    handleLimitChange,
    handleFilterInputChange,
    handleShouldFilterRowsChange,
  };
};

export default useTableInfiniteScroll;

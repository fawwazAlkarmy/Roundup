import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

const useSearch = (searchInput: string, offset: number, limit: number) => {
  const params = {
    keywords: searchInput,
    offset,
    limit,
  };

  const { data, isLoading, isError } = useQuery(
    ["searchedArticles", searchInput, offset, limit],
    () => client.News.news(params)
  );
  return { data, isLoading, isError };
};

export default useSearch;

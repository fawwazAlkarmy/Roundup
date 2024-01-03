import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

const useCategoryHeadlines = (category: string) => {
  const params = {
    categories: category.toLowerCase(),
    languages: "en",
  };
  const { data, isLoading, isError } = useQuery(["categoryHeadlines"], () =>
    client.News.news(params)
  );
  return { data, isLoading, isError };
};

export default useCategoryHeadlines;

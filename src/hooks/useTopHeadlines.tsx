import { useQuery, useQueryClient } from "@tanstack/react-query";
import client from "../api/client";
import dayjs from "dayjs";

const date = dayjs();
const today = date.format("YYYY-MM-DD");
const startingDate = "2023-1-1";

const useTopHeadlines = (category: string) => {
  const queryClient = useQueryClient();

  const params = {
    categories: category,
    date: `${startingDate},${today}`,
  };

  const { data, isLoading, isError } = useQuery(
    ["topHeadlines", category],
    () => client.News.news(params),
    {
      enabled: !!category,
    }
  );

  const handleCategoryChange = (newCategory: string) => {
    queryClient.invalidateQueries(["articles", newCategory]);
  };
  return { data, isLoading, isError };
};

export default useTopHeadlines;

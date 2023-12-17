import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiPick } from "../types";

const getRecommendation = async () => {
  const response = await axios.get(
    "https://yak-select-morally.ngrok-free.app/recommend"
  );
  return response.data.recommended_articles;
};

const useRecommendation = () => {
  const { data, isLoading, isError, isFetching } = useQuery<AiPick[]>({
    queryKey: ["recommendation"],
    queryFn: getRecommendation,
    placeholderData: [],
  });

  return { data, isLoading, isError, isFetching };
};

export default useRecommendation;

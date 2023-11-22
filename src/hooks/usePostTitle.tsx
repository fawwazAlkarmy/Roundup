import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostTitle = (articleTitle: string) => {
  const postTitle = useMutation({
    mutationFn: async () => {
      const response = await axios.post("http://10.0.2.2:5000/recommend", {
        article_title: articleTitle,
      });
      return response.data;
    },
    onSuccess: () => {
      console.log("Success from server");
    },
    onError: (error) => {
      console.error("Error from server:", error);
    },
  });
  return { postTitle };
};

export default usePostTitle;

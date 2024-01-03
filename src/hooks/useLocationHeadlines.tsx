import { useQuery } from "@tanstack/react-query";
import client from "../api/client";

const params = {
  countries: "",
};

const useLocationHeadlines = (location: string) => {
  switch (location) {
    case "Asia":
      params.countries = "cn,hk,id,jp,my,ph,sg,kr,th,tw";
      break;
    case "Europe":
      params.countries =
        "at,be,bg,ca,cz,fr,de,gr,hu,ie,it,lv,lt,nl,no,pl,pt,ro,rs,sk,si,se,ch,tr,ua";
      break;
    case "Africa":
      params.countries = "ng,za";
      break;
    case "Middle East":
      params.countries = "eg,sa,ae";
    default:
      break;
  }

  const { data, isLoading, isError } = useQuery(["locationHeadlines"], () =>
    client.News.news(params)
  );
  return { data, isLoading, isError };
};

export default useLocationHeadlines;

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../common/api/axios";
import { IPagination } from "../../common/types/pagination";
import getPageQueryParam from "../../common/utils/getPageQueryParam";
import { Planet } from "../types/planet";

interface Planets extends IPagination {
  results?: ReadonlyArray<Planet>;
}

const fetchPlanets = async (page: number): Promise<Planets> => {
  if (page <= 0)
    return {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };
  const response = await axios.get(`/planets/?page=${page}`);
  return response.data;
};

export const usePlanetsQuery = () =>
  useInfiniteQuery(["todos"], ({ pageParam = 1 }) => fetchPlanets(pageParam), {
    getPreviousPageParam: (firstPage) => {
      const { previous } = firstPage;
      if (previous !== null) {
        return getPageQueryParam(previous) ?? undefined;
      }
      return undefined;
    },
    getNextPageParam: (lastPage) => {
      const { next } = lastPage;
      if (next !== null) {
        return getPageQueryParam(next) ?? undefined;
      }
      return undefined;
    },
  });

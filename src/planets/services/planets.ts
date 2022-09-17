import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "../../common/api/axios";
import { store } from "../../common/redux/store";
import { IPagination } from "../../common/types/pagination";
import getIdFromUrl from "../../common/utils/getIdFromUrl";
import getPageQueryParam from "../../common/utils/getPageQueryParam";
import { set } from "../slices/planetsSlice";
import { Planet } from "../types/planet";

interface Planets extends IPagination {
  results: ReadonlyArray<Planet>;
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
  useInfiniteQuery(
    ["planets"],
    ({ pageParam = 1 }) => fetchPlanets(pageParam),
    {
      getNextPageParam: (lastPage) => {
        const { next } = lastPage;
        if (next !== null) {
          return getPageQueryParam(next) ?? undefined;
        }
        return undefined;
      },
      select(data) {
        const pages = data.pages.map((page) => {
          const { results } = page;
          const resultsWithId = results.map((result) => ({
            ...result,
            id: getIdFromUrl(result.url, "https://swapi.dev/api/planets/"),
          }));
          return {
            ...page,
            results: resultsWithId,
          };
        });
        return { pages, pageParams: data.pageParams };
      },
      onSuccess(data) {
        const planets = data.pages.flatMap((page) => page.results);
        store.dispatch(set(planets));
      },
    }
  );

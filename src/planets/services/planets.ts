import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "../../common/api/axios";
import { store } from "../../common/redux/store";
import { IPagination } from "../../common/types/pagination";
import getIdFromUrl from "../../common/utils/getIdFromUrl";
import getPageQueryParam from "../../common/utils/getPageQueryParam";
import { SWAPI_PLANETS_URL } from "../lib/strings";
import { add, set } from "../slices/planetsSlice";
import { Planet } from "../types/planet";

interface Planets extends IPagination {
  results: ReadonlyArray<Planet>;
}

const fetchPlanet = async (planetId: string): Promise<Planet> => {
  const response = await axios.get(`/planets/${planetId}`);
  return response.data;
};

export const usePlanetQuery = (planetId: string, enabled: boolean) =>
  useQuery(["planet", planetId], () => fetchPlanet(planetId), {
    enabled,
    select(data) {
      return {
        ...data,
        id: getIdFromUrl(data.url, SWAPI_PLANETS_URL),
      };
    },
    onSuccess(data) {
      store.dispatch(add(data));
    },
  });

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
            id: getIdFromUrl(result.url, SWAPI_PLANETS_URL),
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

/* eslint-disable camelcase */
import { useQuery } from "@tanstack/react-query";
import axios from "../../common/api/axios";
import { IPagination } from "../../common/types/pagination";

interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}
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

export const usePlanetsQuery = (page: number) =>
  useQuery(["todos", page], () => fetchPlanets(page));

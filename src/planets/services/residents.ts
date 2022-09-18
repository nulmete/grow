import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "../../common/api/axios";
import { store } from "../../common/redux/store";
import getIdFromUrl from "../../common/utils/getIdFromUrl";
import { add } from "../slices/residentsSlice";
import { Resident } from "../types/resident";

const fetchResident = async (residentId: string): Promise<Resident> => {
  const response = await axios.get(`/people/${residentId}`);
  return response.data;
};

export const useResidentQuery = (residentId: string, enabled: boolean) =>
  useQuery(["resident", residentId], () => fetchResident(residentId), {
    enabled,
    select(data) {
      return {
        ...data,
        id: getIdFromUrl(data.url, "https://swapi.dev/api/people/"),
      };
    },
    onSuccess(data) {
      store.dispatch(add(data));
    },
  });

export const useResidentsQuery = (residentIds: string[] | undefined) =>
  useQueries({
    queries:
      residentIds?.map((residentId) => {
        return {
          queryKey: ["resident", residentId],
          queryFn: () => fetchResident(residentId),
          enabled: residentIds.length > 0,
          select(data: Resident) {
            return {
              ...data,
              id: getIdFromUrl(data.url, "https://swapi.dev/api/people/"),
            };
          },
        };
      }) ?? [],
  });

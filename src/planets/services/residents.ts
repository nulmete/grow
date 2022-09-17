import { useQueries } from "@tanstack/react-query";
import axios from "../../common/api/axios";
import { Resident } from "../types/resident";

const fetchResident = async (residentId: string): Promise<Resident> => {
  const response = await axios.get(`/people/${residentId}`);
  return response.data;
};

export const useResidentsQuery = (residentIds: string[] | undefined) =>
  useQueries({
    queries:
      residentIds?.map((residentId) => {
        return {
          queryKey: ["resident", residentId],
          queryFn: () => fetchResident(residentId),
          enabled: residentIds.length > 0,
        };
      }) ?? [],
  });

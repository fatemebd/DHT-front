import axiosInstance from "@/utils/axios";
import { CREATE_NEW_SUGGESTION } from "./constants";
import { useMutation } from "@tanstack/react-query";
import { Suggestion } from "./api.types";

const createSuggestion = async (suggestion: Suggestion) => {
  const response = await axiosInstance.post(CREATE_NEW_SUGGESTION, suggestion);
  return response;
};

export const useCreateSuggestion = () => {
  // const { refetch } = useGetUserDetail();

  return useMutation({
    mutationKey: [CREATE_NEW_SUGGESTION],
    mutationFn: createSuggestion,
    // onSuccess: () => {
    //   refetch();
    // },
  });
};

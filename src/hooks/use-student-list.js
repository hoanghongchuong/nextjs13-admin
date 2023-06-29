import studentApi from "@/api-client/student-api";
import { QueryKeys } from "@/config/query-keys";
import useSWR from "swr";

const fetcher = (url) => axiosClient.get(url);
export function useStudentList({ params, options }) {
  const swrResponse = useSWR([QueryKeys.GET_STUDENT_LIST, params], () => studentApi.getListStudent(params), {
    dedupingInterval: 30 * 1000,
    keppPreviousData: true,
    fallbackData: {
      // data: {
      //   code: '',
      //   data: [],
      //   message: ''
      // }
    },
    ...options
  })

  return swrResponse;
}

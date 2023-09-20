import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //filter
  const filterVal = searchParams.get("status");
  const filtered =
    filterVal === "all" || !filterVal
      ? null
      : { field: "status", value: filterVal };

  //sort
  const sortByParams = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByParams.split("-");
  const sortBy = { field, direction };

  //pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filtered, sortBy, page],
    queryFn: () => getBookings(filtered, sortBy, page),
  });

  const pageSize = count / PAGE_SIZE;
  //prefetching
  if (page < pageSize)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filtered, sortBy, page + 1],
      queryFn: () => getBookings(filtered, sortBy, page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filtered, sortBy, page - 1],
      queryFn: () => getBookings(filtered, sortBy, page - 1),
    });

  return { bookings, isLoading, error, count };
}

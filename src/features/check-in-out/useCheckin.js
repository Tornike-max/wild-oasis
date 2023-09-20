import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: checkInMutate, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Successfully update booking #${data.id}`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (data) => {
      toast.error(`Error updating booking #${data.id}`);
    },
  });
  return { checkInMutate, isCheckingIn };
}

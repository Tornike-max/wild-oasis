import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkMutateOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Successfully check out booking #${data.id}`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`Error while check out`);
    },
  });
  return { checkMutateOut, isCheckingOut };
}

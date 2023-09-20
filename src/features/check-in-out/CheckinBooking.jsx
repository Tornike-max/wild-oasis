import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useState } from "react";
import { useCheckin } from "./useCheckin";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../ui/Checkbox";
import { useSettings } from "../settings/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [checkIn, setCheckIn] = useState(false)
  const [addBreakFast, setAddBreakFast] = useState(false)
  const moveBack = useMoveBack();

  const { booking, isLoading, error } = useBooking()
  const { checkInMutate, isCheckingIn } = useCheckin()
  const { data: settings, isLoading: isLoadingSettings } = useSettings()

  if (isLoading || isLoadingSettings || isCheckingIn) return <Spinner />

  if (error) return <Empty />
  console.log(booking)

  const {
    id: bookingId,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    guests: { fullName }
  } = booking;

  const optionalBreakFastPrice = settings.breakfastPrice * numGuests * numNights;
  console.log(optionalBreakFastPrice)


  function handleCheckin() {

    if (addBreakFast) {
      checkInMutate({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakFastPrice,
          totalPrice: totalPrice + optionalBreakFastPrice
        }
      })
    } else {
      checkInMutate({ bookingId, breakfast: {} })
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && <Box>
        <Checkbox id='breakfast' checked={addBreakFast} onChange={() => {
          setAddBreakFast((breakfast) => !breakfast)
          setCheckIn(false)
        }} >
          Want to breakfast for {formatCurrency(optionalBreakFastPrice)}?
        </Checkbox>
      </Box>}

      <Box>
        <Checkbox id='confirm' checked={checkIn} onChange={() => setCheckIn((check) => !check)} disabled={checkIn}>
          I confirm that {fullName} has paid the total amount of ({!addBreakFast ? formatCurrency(totalPrice) : `${formatCurrency(totalPrice)} + ${formatCurrency(optionalBreakFastPrice)}`})
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!checkIn}>Check in booking #{bookingId}</Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import { useNavigate } from "react-router-dom";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate()
  const { booking, isLoading, error } = useBooking()
  const { checkMutateOut, isCheckingOut } = useCheckout()
  const { deleteMutateBooking, isDeleting } = useDeleteBooking()

  console.log(booking)

  // const booking = {};
  // const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading || isDeleting) return <Spinner />
  if (error) return <Empty resource='booking' />
  const { id: bookingId, status } = booking
  if (isCheckingOut) return <Spinner />

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Modal>
        <ButtonGroup>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete</Button>
          </Modal.Open>
          {status === 'unconfirmed' && <Button icon={<HiArrowDownOnSquare />} onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>}

          {status === 'checked-in' && <Button icon={<HiArrowUpOnSquare />} onClick={() => checkMutateOut(bookingId)}>Check out</Button>}
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
        </ButtonGroup>
        <Modal.Window name='delete'>
          <ConfirmDelete resourceName='Booking' disabled={isDeleting} onConfirm={() => deleteMutateBooking(bookingId, {
            onSettled: () => navigate(-1)
          })} />
        </Modal.Window>
      </Modal >
    </>
  );
}

export default BookingDetail;

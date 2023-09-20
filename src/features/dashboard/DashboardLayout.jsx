import styled from "styled-components";
import Stats from "./Stats";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentsStays";
import Spinner from "../../ui/Spinner";
import { useCabinTable } from "../cabins/useCabinTable";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActicity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isLoading1, bookingsQuery } = useRecentBookings()
  const { isLoading: isLoading2, confirmedStays, numDays } = useRecentStays()
  const { cabins, isLoading: isLoading3 } = useCabinTable()

  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookingsQuery} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodayActicity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookingsQuery} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout


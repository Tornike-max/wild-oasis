import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Dashboard from './pages/Dashboard'
import Cabins from './pages/Cabins'
import Bookings from './pages/Bookings'
import Login from './pages/Login'
import Settings from './pages/Settings'
import Users from './pages/Users'
import Account from './pages/Account'
import PageNotFound from './pages/PageNotFound'
import GlobalStyles from "./styles/GlobalStyles"
import AppLayout from "./ui/AppLayout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"
import Booking from "./pages/Booking"
import CheckIn from "./pages/CheckIn"
import ProtectedRout from "./ui/ProtectedRout"
import { DarkModeProvider } from "./context/DarkModeContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000
      staleTime: 0
    }
  }
})

function App() {
  return (

    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRout>
              <AppLayout />
            </ProtectedRout>}>
              <Route index element={<Navigate replace to='/dashboard' />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/cabin' element={<Cabins />} />
              <Route path='/bookings' element={<Bookings />} />
              <Route path='/bookings/:bookingId' element={<Booking />} />
              <Route path='/checkin/:bookingId' element={<CheckIn />} />
              <Route path='/account' element={<Account />} />
              <Route path='/setting' element={<Settings />} />
              <Route path='/user' element={<Users />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000,
              iconTheme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 4000,
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-50)',
              color: 'var(--color-grey-700)'
            }
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App

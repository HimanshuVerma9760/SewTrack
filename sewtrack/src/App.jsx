import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login, { loginLoader } from "./Components/Login";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, Skeleton, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
// import AddCustomer from "./Components/AddCustomer";
import Navigation from "./Components/Navigation";
import RouteAuthGuardLoader from "./util/loaders/RouteAuthGuardLoader";
import Dashboard from "./Components/Dashboard";
import Customers from "./Components/Customers/Customers";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./util/API/http";
import AddCustomer from "./Components/Customers/AddCustomer";
import Appointments from "./Components/Appointments/Appointments";
import AddAppointment from "./Components/Appointments/AddAppointments";
import AddAppointmentAction from "./util/actions/AddAppointmentAction";
import EditAppointmentAction from "./util/actions/EditAppointmentAction";
import EditAppointment from "./Components/Appointments/EditAppointment";

export default function App() {
  const theme = createTheme({
    palette: {
      background: {
        default: grey[50],
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      loader: loginLoader,
      hydrateFallbackElement: (
        <Skeleton width={500} height={500} sx={{ margin: "auto" }} />
      ),
      element: <Login />,
    },
    {
      path: "/",
      loader: RouteAuthGuardLoader,
      element: <Navigation />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/customers",
          element: <Customers />,
        },
        {
          path: "/customers/add-customer",
          element: <AddCustomer />,
        },
        {
          path: "/appointments",
          element: <Appointments />,
        },
        {
          path: "/appointments/add-appointments",
          action: AddAppointmentAction,
          element: <AddAppointment />,
        },
        {
          path: "/appointments/add-appointments",
          action: AddAppointmentAction,
          element: <AddAppointment />,
        },
        {
          path: "/appointments/edit-appointments/:customerId/:appointmentId",
          action: EditAppointmentAction,
          element: <EditAppointment />,
        },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

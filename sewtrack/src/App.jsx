import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { grey } from "@mui/material/colors";
import AddCustomer from "./Components/AddCustomer";
import Navigation from "./Components/Navigation";
import RouteAuthGuardLoader from "./util/loaders/RouteAuthGuardLoader";

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
      element: <Login />,
    },
    {
      path: "/",
      loader: RouteAuthGuardLoader,
      element: <Navigation />,
      children: [
        {
          path: "/customers/add-customer",
          element: <AddCustomer />,
        },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

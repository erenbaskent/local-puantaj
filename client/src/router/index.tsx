import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/Login";
import SchedulesPage from "@/pages/Schedules";
import ShiftsPage from "@/pages/Shifts";
import { ProtectedRoute, AdminRoute, GuestRoute } from "./guards";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <GuestRoute />,
    children: [{ index: true, element: <LoginPage /> }],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { index: true, element: <Navigate to="/schedules" replace /> },
          { path: "schedules", element: <SchedulesPage /> },
          {
            element: <AdminRoute />,
            children: [{ path: "shifts", element: <ShiftsPage /> }],
          },
        ],
      },
    ],
  },
]);

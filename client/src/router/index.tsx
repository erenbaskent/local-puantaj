import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/Login";
import SchedulesPage from "@/pages/Schedules";
import PersonalCalendarPage from "@/pages/PersonalCalendar";
import ShiftsPage from "@/pages/Shifts";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to="/schedules" replace /> },
      { path: "schedules", element: <SchedulesPage /> },
      { path: "my-calendar", element: <PersonalCalendarPage /> },
      { path: "shifts", element: <ShiftsPage /> },
    ],
  },
]);

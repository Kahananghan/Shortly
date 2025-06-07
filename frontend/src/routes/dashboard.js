import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Dashboard from "../Pages/Dashboard"
import { checkAuth } from "../utils/helper"

export const DashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
  beforeLoad: checkAuth
})
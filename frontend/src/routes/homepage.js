import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Homepage from "../Pages/Homepage"

export const HomepageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Homepage,
})
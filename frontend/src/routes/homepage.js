import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Homepage from "../Pages/Homepage"
import { checkAuth } from "../utils/helper"

export const HomepageRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Homepage,
  beforeLoad : checkAuth
})
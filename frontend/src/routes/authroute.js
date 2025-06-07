import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Authpage from "../Pages/Authpage"

export const AuthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: Authpage,
})
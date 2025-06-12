import { createRoute } from "@tanstack/react-router"
import { rootRoute } from "./routeTree"
import Account from "../Pages/Account"
import { checkAuth } from "../utils/helper"

export const AccountRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/account',
  component: Account,
  beforeLoad: checkAuth
})
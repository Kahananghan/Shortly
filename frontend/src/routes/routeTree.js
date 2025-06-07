import { createRootRoute } from '@tanstack/react-router'
import App from '../App'
import { HomepageRoute } from './homepage'
import { DashboardRoute } from './dashboard'
import { AuthRoute } from './authroute'

export const rootRoute = createRootRoute({
    component: App 
})

export const routeTree = rootRoute.addChildren([
    HomepageRoute,
    DashboardRoute,
    AuthRoute
])

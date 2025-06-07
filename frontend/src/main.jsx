import { createRoot } from 'react-dom/client'
import './index.css'    
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routes/routeTree.js'
import { Provider } from'react-redux'
import { store } from './store/store.js'

const queryClient = new QueryClient()
const router = createRouter({ routeTree, context: { queryClient, store }})

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <QueryClientProvider client={new QueryClient()}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </Provider>
)

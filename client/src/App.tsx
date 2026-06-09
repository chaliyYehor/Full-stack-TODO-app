import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/Main'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './components/main/Dashboard'
import EditTask from './components/main/EditTask'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/dashboard',
				element: <Dashboard />,
			},
			{
				path: '/editTask/:todoId',
				element: <EditTask />,
			},
		],
	},
	{
		path: '/signUp',
		element: <SignUp />,
	},
	{
		path: '/signIn',
		element: <SignIn />,
	},
])

const client = new QueryClient()

function App() {
	return (
		<>
			<QueryClientProvider client={client}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	)
}

export default App

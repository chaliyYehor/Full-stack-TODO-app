import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/Main'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Dashboard from './components/main/Dashboard'
import EditTask from './components/main/EditTask'
import ViewTask from './components/main/ViewTask'
import MyTask from './components/main/MyTask'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: 'editTask/:todoId',
				element: <EditTask />,
			},
			{
				path: 'viewTask/:todoId',
				element: <ViewTask />,
			},
			{
				path: 'myTask',
				children: [
					{
						index: true,
						element: <MyTask />,
					},
					{
						path: ':taskId',
						element: <MyTask />,
					},
				],
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

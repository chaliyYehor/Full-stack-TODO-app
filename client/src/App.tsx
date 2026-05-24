import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './pages/Main'
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main />,
		errorElement: <NotFound />,
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

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	)
}

export default App

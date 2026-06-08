import {
	CalendarCheck,
	LayoutDashboard,
	ListChecks,
	LogOut,
	Settings,
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { BsExclamationLg } from 'react-icons/bs'
import { HiQuestionMarkCircle } from 'react-icons/hi'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import { useEffect } from 'react'

export default function Menu() {
	const navigate = useNavigate()

	const { data, isPending, isError } = useGetUserInfo()

	useEffect(() => {
		if (isError) {
			navigate('/signUp')
		}
	}, [isError, navigate])

	return (
		<div className='menu-wrapper flex flex-col items-center relative bg-[#FF6767] shadow-md rounded-r-xl min-w-100 min-h-[calc(100dvh-11rem)] mt-15 text-white'>
			<div className='account-info pt-17 flex flex-col items-center'>
				<div className='pfp absolute flex justify-center items-center -top-13 bg-cyan-500 rounded-full w-25 h-25 text-5xl font-bold'>
					{data?.lastName.split('')[0]}
				</div>
				<p className='name font-bold text-xl'>{`${data?.firstName} ${data?.lastName}`}</p>
				<p className='email'>{data?.email}</p>
			</div>
			<nav className='menu w-full flex flex-col items-center mt-10'>
				<ul className='flex flex-col ml-14 gap-2.5 w-full'>
					<li>
						<Link to={'#'}>
							<LayoutDashboard size={35} /> Dashboard
						</Link>
					</li>
					<li>
						<Link to={'#'}>
							<BsExclamationLg size={48} className='-ml-1' />{' '}
							<span className='inline-block -ml-2'>Vital Task</span>
						</Link>
					</li>
					<li>
						<Link to={'#'}>
							<CalendarCheck size={35} />
							My Task
						</Link>
					</li>
					<li>
						<Link to={'#'}>
							<ListChecks size={35} /> Task Categories
						</Link>
					</li>
					<li>
						<Link to={'#'}>
							<Settings size={35} /> Settings
						</Link>
					</li>
					<li>
						<Link to={'#'}>
							<HiQuestionMarkCircle size={35} /> Help
						</Link>
					</li>
				</ul>
			</nav>

			<Link
				className='absolute text-xl flex justify-center items-center gap-5 bottom-10 left-10'
				to={'/signUp'}
			>
				<LogOut size={35} /> Logout
			</Link>
		</div>
	)
}

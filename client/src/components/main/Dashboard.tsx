import { useGetUserInfo } from '../../hooks/useGetUserInfo'
import CompletedTask from '../dashboard/CompletedTask'
import TaskStatus from '../dashboard/TaskStatus'
import ToDoSection from '../dashboard/ToDoSection'

export default function Dashboard() {
	const { data } = useGetUserInfo()

	return (
		<div
			className='dashboard-wrapper w-full
		 h-[calc(100dvh-14rem)] mt-15 ml-19'
		>
			<h1 className='inline-block text-4xl'>
				Welcome back<span translate='no'>{', ' + data?.username}</span> 👋
			</h1>

			<div className='dashboard-info-wrapper p-4 border-[#A1A3AB] border-2 gap-6 grid grid-cols-2 h-full min-h-0 overflow-hidden'>
				<ToDoSection />
				<div className='w-full h-full min-h-0 grid grid-rows-[2fr_3fr] gap-5'>
					<TaskStatus />
					<CompletedTask />
				</div>
			</div>
		</div>
	)
}

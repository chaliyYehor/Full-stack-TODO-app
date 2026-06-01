import CompletedTask from './CompletedTask'
import TaskStatus from './TaskStatus'
import ToDoSection from './ToDoSection'

export default function Dashboard() {
	return (
		<div
			className='dashboard-wrapper w-full
		 h-[calc(100dvh-14rem)] mt-15 ml-19'
		>
			<h1 className='inline-block text-4xl'>Welcome back, Sundar 👋</h1>

			<div className='dashboard-info-wrapper p-4 border-[#A1A3AB] border-2 grid grid-cols-2 h-full min-h-0 overflow-hidden'>
				<ToDoSection />
				<div className='w-full flex flex-col justify-center items-center'>
					<TaskStatus />
					<CompletedTask />
				</div>
			</div>
		</div>
	)
}

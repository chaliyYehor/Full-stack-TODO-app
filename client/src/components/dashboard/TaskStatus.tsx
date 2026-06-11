import { useGetAllTodos } from '../../hooks/useGetAllTodos'
import CircledPercentage from './CircledPercentage'

export default function TaskStatus() {
	const { data: todos } = useGetAllTodos()

	const percentNotStarted = todos
		? Math.round((todos?.filter(todo => todo.status === 'Not Started').length /
				todos?.length) *
			100)
		: undefined

	const percentInProgress = todos
		? Math.round((todos?.filter(todo => todo.status === 'In Progress').length /
				todos?.length) *
			100)
		: undefined

	const percentCompleted = todos
		? Math.round((todos?.filter(todo => todo.status === 'Completed').length /
				todos?.length) *
			100)
		: undefined

	console.log(percentNotStarted)

	return (
		<div className='taskStatusWrapper p-6.25 h-full min-h-0 w-full flex flex-col overflow-hidden'>
			<div className='heading flex'>
				<img src='/dashboard/taskStatusIcon.png' alt='status icon' />
				<span className='text-[#FF6767] inline-block ml-2 font-semibold text-xl'>
					Task Status
				</span>
			</div>
			<div className='info flex items-center justify-between mt-5'>
				<CircledPercentage state='Completed' percent={percentCompleted} />
				<CircledPercentage state='In Progress' percent={percentInProgress} />
				<CircledPercentage state='Not Started' percent={percentNotStarted} />
			</div>
		</div>
	)
}

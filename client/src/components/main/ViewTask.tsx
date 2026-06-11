import { useNavigate, useParams } from 'react-router-dom'
import { useGetAllTodos } from '../../hooks/useGetAllTodos'
import dayjs from 'dayjs'

export default function ViewTask() {
	const navigate = useNavigate()
	const { todoId } = useParams()
	const { data: todos } = useGetAllTodos()
	const todo = todos?.filter(todo => todo._id === todoId)
	if (!todo) return
	const {
		title,
		priority,
		status,
		createdAt,
		taskDescription,
		imageUrl,
		updatedAt,
	} = todo[0]

	const formattedDate = dayjs(createdAt).format('DD/MM/YYYY')

	const difference = dayjs(updatedAt).diff(dayjs(createdAt), 'day')

	console.log(difference)

	let statusColor =
		status === 'Not Started'
			? '#F21E1E'
			: status === 'In Progress'
				? '#0225FF'
				: '#05A301'

	const priorityColor =
		priority === 'Extreme'
			? '#F21E1E'
			: priority === 'Moderate'
				? '#3ABEFF'
				: '#05A301'

	return (
		<div className='viewTaskWrapper relative w-full h-[calc(100dvh-13rem)] mb-10 mt-15 ml-20 border-2 border-[#A1A3AB] rounded-2xl p-8'>
			<button
				type='button'
				className='cursor-pointer text-xl font-semibold underline absolute right-10'
				onClick={() => {
					navigate(-1)
				}}
			>
				Go Back
			</button>
			<div className='flex gap-5 mb-20'>
				{imageUrl && (
					<div className='w-75 max-h-75 overflow-hidden'>
						<img className='object-cover w-full' src={imageUrl} alt='img' />
					</div>
				)}
				<div className='todo-info text-[13px] flex flex-col gap-5'>
					<h2 className='font-bold text-4xl capitalize max-w-[80%] wrap-normal'>
						{title}
					</h2>
					<div className='spanWrapper flex flex-col gap-2 text-[20px]'>
						<span>
							Priority:{' '}
							<span
								className='font-semibold'
								style={{
									color: priorityColor,
								}}
							>
								{priority}
							</span>
						</span>
						<span>
							Status:{' '}
							<span className='font-semibold' style={{ color: statusColor }}>
								{status}
							</span>
						</span>
						<span className='text-[#A1A3AB]'>Created on: {formattedDate}</span>
						<span className='text-[#A1A3AB]'>
							{difference === 0
								? 'Completed today.'
								: `Completed ${difference} days ago.`}
						</span>
					</div>
				</div>
			</div>
			<div>
				<p className='text-[#747474] text-[18px] capitalize'>
					{taskDescription}
				</p>
			</div>
		</div>
	)
}

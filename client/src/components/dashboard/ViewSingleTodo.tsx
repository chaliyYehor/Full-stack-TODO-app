import dayjs from 'dayjs'
import { useDeleteTodo } from '../../hooks/useDeleteTodo'
import type { TodoType } from '../../schemas/todosSchema'
import { Link } from 'react-router-dom'
import { SquarePen, Trash } from 'lucide-react'
import clsx from 'clsx'

type Props = {
	todo: TodoType
	setCurrentTodo?: React.Dispatch<React.SetStateAction<TodoType | undefined>>
}

export default function ViewSingleTodo({ todo, setCurrentTodo }: Props) {
	const { mutateAsync: deleteTodo, isPending: isDeleting } = useDeleteTodo()
	const {
		title,
		priority,
		status,
		createdAt,
		taskDescription,
		imageUrl,
		updatedAt,
		_id,
	} = todo

	const formattedDate = dayjs(createdAt).format('DD/MM/YYYY')

	const difference = dayjs(updatedAt).diff(dayjs(createdAt), 'day')

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

	const deleteTodoOnClick = async () => {
		try {
			if (!_id) return
			await deleteTodo({ taskId: _id })
			setCurrentTodo && setCurrentTodo(undefined)
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<>
			<div className='flex gap-5 mb-20'>
				{imageUrl && (
					<div className='w-75 max-h-75 overflow-hidden'>
						<img className='object-cover w-full' src={imageUrl} alt='img' />
					</div>
				)}
				<div className='todo-info text-[13px] flex flex-col gap-5'>
					<h2
						className={clsx(
							imageUrl ? 'max-w-62.5' : 'max-w-125',
							'font-bold text-4xl capitalize wrap-break-word',
						)}
					>
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
				<div className='text w-[80%] h-[20%] overflow-y-scroll'>
					<p className='text-[#747474] w-full max-h-95 text-[18px] capitalize'>
						{taskDescription}
					</p>
				</div>
			</div>
			<div className='tools w-fit flex gap-5 absolute bottom-5 right-5 flex-col'>
				<div
					onClick={deleteTodoOnClick}
					className='delete cursor-pointer bg-[#FF6767] hover:bg-[#d65a5a] transition flex justify-center items-center w-15.5 h-15.5 rounded-2xl'
				>
					{isDeleting ? (
						<div className='w-full h-full flex justify-center items-center'>
							<div className='loader ' />
						</div>
					) : (
						<Trash color='white' size={30} />
					)}
				</div>
				<div className='editTask cursor-pointer bg-[#FF6767] hover:bg-[#d65a5a] transition flex justify-center items-center w-15.5 h-15.5 rounded-2xl'>
					<Link
						className='w-full h-full inline-flex justify-center items-center'
						to={`/editTask/${_id}`}
					>
						<SquarePen color='white' size={30} />
					</Link>
				</div>
			</div>
		</>
	)
}

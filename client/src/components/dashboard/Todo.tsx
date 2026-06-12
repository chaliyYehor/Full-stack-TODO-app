import { Check, Circle } from 'lucide-react'
import type { TodoType } from '../../schemas/todosSchema'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDeleteTodo } from '../../hooks/useDeleteTodo'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'
import { useChangeStatus } from '../../hooks/useChangeStatus'
import z from 'zod'

type Props = {
	completed: boolean
	todoInfo: TodoType
}

export default function Todo({ completed, todoInfo }: Props) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	const queryClient = useQueryClient()

	const {
		imageUrl,
		priority,
		taskDescription,
		title,
		status,
		createdAt,
		_id,
		updatedAt,
	} = todoInfo
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

	const { mutateAsync: deleteTodoFunc, isPending: isDeleting } = useDeleteTodo()

	const deleteTodo = async (todoId: string) => {
		try {
			await deleteTodoFunc({ taskId: todoId })
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		} catch (error) {
			if (axios.isAxiosError(error)) {
				console.log(error.response?.data?.msg)
				return
			}
		}
	}

	const [userStatusIdx, setUserStatusIdx] = useState<number>(0)
	const statusProperties: ['Not Started', 'In Progress', 'Completed'] = [
		'Not Started',
		'In Progress',
		'Completed',
	]
	const currentStatusIdx = statusProperties.findIndex(idx => idx === status)
	useEffect(() => {
		setUserStatusIdx(currentStatusIdx)
	}, [status])

	const changeStatusUI = () => {
		if (userStatusIdx === undefined) return
		const nextIdx = (userStatusIdx + 1) % 3
		setUserStatusIdx(nextIdx)
	}

	const { mutateAsync: changeStatus, isPending: isChangingStatus } =
		useChangeStatus()

	const changeStatusServer = async () => {
		if (statusProperties[userStatusIdx] === status || !status) return
		const result = z
			.object({
				status: z.enum(['Not Started', 'In Progress', 'Completed']),
			})
			.safeParse({ status: statusProperties[userStatusIdx] })
		if (!result.success) {
			return
		}
		try {
			await changeStatus({ data: result.data, taskId: _id })
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<>
			<div className='todo-wrapper select-none grid grid-rows-3 relative mt-4 gap-3 rounded-lg border border-[#A1A3AB] py-4 px-6 h-60'>
				<div className='todo-status absolute left-1 top-1'>
					<Circle strokeWidth={3} color={statusColor} />
				</div>

				<div
					onClick={() => setIsDropdownOpen(state => (state ? false : true))}
					className='tools absolute right-2 gap-0.5 flex justify-center items-center cursor-pointer w-14 h-10 '
				>
					<Circle strokeWidth={3} size={12} color='#A1A3AB' />
					<Circle strokeWidth={3} size={12} color='#A1A3AB' />
					<Circle strokeWidth={3} size={12} color='#A1A3AB' />
				</div>
				{isDropdownOpen && (
					<div className='todoDropdown cursor-default absolute top-8 right-2 w-50 h-fit p-2 text-[16px] bg-white shadow-xl rounded-md'>
						<ul className='flex flex-col gap-2'>
							<li className='w-full h-full'>
								<Link
									className='w-full h-full inline-block p-2'
									to={`/editTask/${_id}`}
								>
									Edit Task
								</Link>
							</li>
							<li className='w-full h-full'>
								<button
									onClick={() => deleteTodo(_id)}
									className='w-full h-full inline-block p-2'
								>
									{isDeleting ? (
										<div className='w-full h-full flex justify-center items-center'>
											<div className='loader ' />
										</div>
									) : (
										'Delete Task'
									)}
								</button>
							</li>
						</ul>
					</div>
				)}

				<h3 className='cursor-pointer font-bold text-2xl capitalize pt-1'>
					<Link to={`/viewTask/${_id}`}>{title}</Link>
				</h3>

				<div className='info-block w-full flex items-center gap-2 '>
					<p className='todo-text w-[75%] text-[#747474] text-[18px] capitalize'>
						{taskDescription}
					</p>
					{imageUrl && <img className='w-[30%]' src={imageUrl} alt='img' />}
				</div>

				<div className='todo-info relative text-[13px] w-full flex justify-between self-end'>
					{!completed && (
						<span>
							Priority:{' '}
							<span
								style={{
									color: priorityColor,
								}}
							>
								{priority}
							</span>
						</span>
					)}
					<span
						onClick={changeStatusUI}
						className='cursor-pointer relative statusText'
					>
						Status:{' '}
						<span
							style={{
								color:
									statusProperties[userStatusIdx] === 'Not Started'
										? '#F21E1E'
										: statusProperties[userStatusIdx] === 'In Progress'
											? '#0225FF'
											: '#05A301',
							}}
						>
							{statusProperties[userStatusIdx]}
						</span>
					</span>
					{statusProperties[userStatusIdx] !== status && status ? (
						<div
							title='Save Changes'
							onClick={changeStatusServer}
							className='saveChanges cursor-pointer rounded-full bg-green-600 transition hover:bg-green-800 flex justify-center items-center w-fit h-fit absolute -top-11 left-[50%] translate-x-[-60%] p-2'
						>
							{isChangingStatus ? (
								<div className='w-full h-full flex justify-center items-center'>
									<div className='loader ' />
								</div>
							) : (
								<Check color='white' size={25} />
							)}
						</div>
					) : (
						''
					)}

					{!completed && (
						<span className='text-[#A1A3AB]'>Created on: {formattedDate}</span>
					)}
				</div>
				{completed && (
					<span className='text-[#747474] text-[13px]'>
						{difference === 0
							? 'Completed today.'
							: `Completed ${difference} days ago.`}
					</span>
				)}
			</div>
		</>
	)
}

import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useEffect, useState } from 'react'
import CreateTask from './taskCreation/CreateTask'
import { useGetAllTodos } from '../../hooks/useGetAllTodos'
import Todo from './Todo'
import { useFormContext } from 'react-hook-form'
import type { CreateTaskFormType } from '../../schemas/createTaskFormSchema'

dayjs.extend(customParseFormat)

export default function ToDoSection() {
	const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

	function isToday(date: string) {
		const parsedDate = dayjs(date, 'DD/MM/YYYY', true)

		return parsedDate.isValid() && parsedDate.isSame(dayjs(), 'day')
	}

	const {
		formState: { isSubmitSuccessful },
	} = useFormContext<CreateTaskFormType>()

	const { data: todos, isPending } = useGetAllTodos()
	const formattedDate = dayjs(todos?.[0]?.createdAt).format('DD/MM/YYYY')

	return (
		<>
			<div className='todoWrapper p-5 h-full min-h-0 relative overflow-hidden flex flex-col'>
				<div className='upperSection flex items-center justify-between shrink-0'>
					<div className='flex'>
						<img src='/dashboard/todoIcon.png' alt='todo-icon' />
						<span className='text-[#FF6767] inline-block ml-2 font-semibold text-xl'>
							To-Do
						</span>
					</div>
					{todos && todos?.length > 0 && (
						<button
							onClick={() => setIsAddTaskOpen(true)}
							className='flex cursor-pointer'
						>
							<Plus color='#FF6767' />
							<span className='inline-block text-[#A1A3AB]'>Add Task</span>
						</button>
					)}
				</div>
				<div className='dateSection w-full shrink-0'>
					20{' '}
					{dayjs()
						.month(5 - 1)
						.format('MMM')}
					<span className='text-[#A1A3AB] ml-2'>
						{isToday(formattedDate) && (
							<>
								<span className='font-bold text-xl'>&#183;</span>
								Today
							</>
						)}
					</span>
				</div>
				<div className='todo-section flex-1 min-h-0 overflow-y-auto pr-2'>
					{todos &&
						todos.map(todo => (
							<Todo
								todoInfo={todo}
								completed={todo.status === 'Completed'}
								key={todo._id}
							/>
						))}
				</div>
				{todos && todos?.length < 1 && (
					<button
						className='FirstTask absolute flex cursor-pointer top-[50%] left-[50%] -translate-x-1/2 text-2xl items-center justify-center'
						onClick={() => setIsAddTaskOpen(true)}
					>
						<Plus color='#FF6767' />
						<span className='inline-block text-[#A1A3AB]'>Add Task</span>
					</button>
				)}
			</div>

			{isAddTaskOpen && (
				<>
					<CreateTask closeTask={setIsAddTaskOpen} />
					<div
						onClick={() => setIsAddTaskOpen(false)}
						className='brightnessDown top-0 left-0 z-10 absolute w-screen h-screen bg-black/70'
					></div>
				</>
			)}
		</>
	)
}

import dayjs from 'dayjs'
import { useGetAllTodos } from '../../hooks/useGetAllTodos'
import Todo from '../dashboard/Todo'
import { useDeleteTodo } from '../../hooks/useDeleteTodo'
import ViewSingleTodo from '../dashboard/ViewSingleTodo'
import { useState } from 'react'
import type { TodoType } from '../../schemas/todosSchema'

export default function MyTask() {
	const [currentTask, setCurrentTask] = useState<TodoType>()

	const { data: todos } = useGetAllTodos()

	return (
		<div className='viewTask w-full h-[calc(100dvh-13rem)] mt-15 ml-20 grid grid-cols-[45%_55%] gap-5'>
			<div className='allTodos w-full max-h-full border-2 border-[#A1A3AB] rounded-2xl p-7.5 flex flex-col gap-5'>
				<h2 className='addNewTaskHeading w-fit relative text-xl font-bold inline-block pb-1'>
					My Tasks
				</h2>

				<div className='todosSect w-full max-h-162.5 overflow-y-auto rounded-xl p-2'>
					{todos &&
						todos.map(todo => (
							<div className='relative w-full h-fit'>
								<div
									title='Open'
									className='overwriteBehavior cursor-pointer absolute top-0 left-0 z-30 w-full h-full'
									onClick={() => setCurrentTask(todo)}
								></div>
								<Todo
									completed={todo.status === 'Completed'}
									todoInfo={todo}
									key={todo.title}
								/>
							</div>
						))}
				</div>
			</div>
			<div className='singleTodo relative w-full max-h-full border-2 border-[#A1A3AB] rounded-2xl p-7.5'>
				{currentTask && <ViewSingleTodo todo={currentTask} setCurrentTodo={setCurrentTask} />}
			</div>
		</div>
	)
}

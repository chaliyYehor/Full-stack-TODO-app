import { useParams } from 'react-router-dom'
import { useGetAllTodos } from '../../hooks/useGetAllTodos'
import type { TodoType } from '../../schemas/todosSchema'

export default function ViewTask() {
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
		date,
	} = todo[0]
	return (
		<div className='viewTaskWrapper'>
			<div>
				<div className='img'>
					<img src={imageUrl} alt='img' />
				</div>
				<div className='info'>
					<h2>{title}</h2>
					<span>Priority: {priority}</span>
					<span>Status: {status}</span>
					<span>Created on: {createdAt}</span>
				</div>
			</div>
			<div>
				<p>{taskDescription}</p>
			</div>
		</div>
	)
}

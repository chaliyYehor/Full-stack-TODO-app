import { useNavigate, useParams } from 'react-router-dom'
import CreateTask from '../dashboard/taskCreation/CreateTask'

export default function EditTask() {
	const navigate = useNavigate()

	const { todoId } = useParams()
	if(!todoId) {
		navigate('/dashboard')
	}
	return (
		<div className='editTaskWrapper w-fit h-fit mt-15 ml-10 shadow-2xl rounded-xl'>
			<CreateTask editTask editTaskId={todoId} />
		</div>
	)
}

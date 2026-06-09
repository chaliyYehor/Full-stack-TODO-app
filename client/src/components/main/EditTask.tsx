import CreateTask from '../dashboard/taskCreation/CreateTask'

export default function EditTask() {
	return (
		<div className='editTaskWrapper w-fit h-fit mt-15 ml-10 shadow-2xl rounded-xl'>
			<CreateTask editTask/>
		</div>
	)
}

import { useParams } from 'react-router-dom'

export default function MyTask() {
	const {taskId} = useParams()



	return (
		<div>MyTask {taskId && taskId}</div>
	)
}

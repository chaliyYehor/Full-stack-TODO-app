import { useParams } from 'react-router-dom'

export default function ViewTask() {
	const {todoId} = useParams()
	return (
		<div>{todoId}</div>
	)
}

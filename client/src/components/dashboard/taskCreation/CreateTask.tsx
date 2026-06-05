type Props = {
	closeTask: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateTask({ closeTask }: Props) {
	return (
		<>
			<div className=' absolute w-[920px] h-[720px] bg-[#F9F9F9]'>
				<h3>Add New Task</h3>
				<button>Go Back</button>
			</div>
		</>
	)
}

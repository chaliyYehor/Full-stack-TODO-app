type Props = {
	closeTask: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateTask({ closeTask }: Props) {
	return (
		<>
			<div className=' absolute left-[50%] z-20 top-[158px] w-[1020px] h-[720px] bg-[#F9F9F9]'>
				<h3>Add New Task</h3>
				<button className='cursor-pointer' onClick={() => closeTask(false)}>
					Go Back
				</button>
			</div>
		</>
	)
}

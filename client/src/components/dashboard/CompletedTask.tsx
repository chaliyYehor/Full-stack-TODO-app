import Todo from './Todo'

export default function CompletedTask() {
	return (
		<div className='completedTaskWrapper w-full h-[60%] p-6.25'>
			<div className='heading flex'>
				<img className='object-contain' src='/dashboard/completedIcon.png' alt='status icon' />
				<span className='text-[#FF6767] inline-block ml-2 font-semibold text-xl'>
					Completed Task
				</span>
			</div>

			<div className="completedSection">
				<Todo completed />
			</div>
		</div>
	)
}

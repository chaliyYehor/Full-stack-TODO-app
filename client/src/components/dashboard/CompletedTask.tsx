import Todo from './Todo'

export default function CompletedTask() {
	return (
		<div className='completedTaskWrapper w-full h-full min-h-0 overflow-hidden p-6.25 flex flex-col'>
			<div className='heading flex shrink-0'>
				<img
					className='object-contain'
					src='/dashboard/completedIcon.png'
					alt='status icon'
				/>
				<span className='text-[#FF6767] inline-block ml-2 font-semibold text-xl'>
					Completed Task
				</span>
			</div>

			<div className='completedSection flex-1 min-h-0 overflow-y-auto pr-2'>
				<Todo completed />
				<Todo completed />
				<Todo completed />
				<Todo completed />
				<Todo completed />
			</div>
		</div>
	)
}

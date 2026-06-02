import CircledPercentage from './CircledPercentage'

export default function TaskStatus() {
	return (
		<div className='taskStatusWrapper p-6.25 h-full min-h-0 w-full flex flex-col overflow-hidden'>
			<div className='heading flex'>
				<img src='/dashboard/taskStatusIcon.png' alt='status icon' />
				<span className='text-[#FF6767] inline-block ml-2 font-semibold text-xl'>
					Task Status
				</span>
			</div>
			<div className='info flex items-center justify-between mt-5'>
				<CircledPercentage state='Completed' percent={0} />
				<CircledPercentage state='In Progress' percent={0} />
				<CircledPercentage state='Not Started' percent={0} />
			</div>
		</div>
	)
}

import CircledPercentage from './CircledPercentage'

export default function TaskStatus() {
	return (
		<div className='taskStatusWrapper p-6.25 h-[40%] w-full flex flex-col'>
			<div className='heading flex'>
				<img src='/dashboard/taskStatusIcon.png' alt='status icon' />
				<span className='text-[#FF6767] inline-block ml-2 font-semibold text-xl'>
					Task Status
				</span>
			</div>
			<div className='info flex items-center justify-between mt-5'>
				<CircledPercentage state='Completed' percent={84} />
				<CircledPercentage state='In Progress' percent={46} />
				<CircledPercentage state='Not Started' percent={13} />
			</div>
		</div>
	)
}

import { Circle } from 'lucide-react'

export default function Todo() {
	return (
		<>
			<div className='todo-wrapper grid grid-rows-3 relative mt-4 gap-3 rounded-lg border border-[#A1A3AB] py-4 px-10 h-60'>
				<div className='todo-status absolute left-2 top-2 text-[#FF6767]'>
					<Circle strokeWidth={3} />
				</div>

				<div className='tools absolute right-2 gap-0.5 flex justify-center items-center cursor-pointer w-14 h-10 '>
					<Circle strokeWidth={3} size={12} color='#A1A3AB' />
					<Circle strokeWidth={3} size={12} color='#A1A3AB' />
					<Circle strokeWidth={3} size={12} color='#A1A3AB' />
				</div>

				<h3 className=' font-bold text-2xl'>Attend Nischal's Birthday Party</h3>

				<div className='info-block w-full flex items-center gap-2 '>
					<p className='todo-text w-[75%] text-[#747474] text-[18px] '>
						Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh
						Elements)
					</p>
					<img className='w-[30%]' src='/dashboard/boilerplate.png' alt='img' />
				</div>

				<div className='todo-info text-[13px] w-full flex justify-between self-end'>
					<span>
						Priority: <span className='text-[#42ADE2]'>Moderate</span>
					</span>
					<span>
						Status: <span className='text-[#F21E1E]'>Not Started</span>
					</span>
					<span className='text-[#A1A3AB]'>Created on: 20/06/2023</span>
				</div>
			</div>
		</>
	)
}

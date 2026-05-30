import dayjs from 'dayjs'
import { Plus } from 'lucide-react'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Todo from './Todo'

dayjs.extend(customParseFormat)

export default function ToDoSection() {
	function isToday(date: string) {
		const parsedDate = dayjs(date, 'DD/MM/YYYY', true)

		return parsedDate.isValid() && parsedDate.isSame(dayjs(), 'day')
	}

	console.log(isToday('30/05/2026'))

	return (
		<>
			<div className='todoWrapper p-5'>
				<div className='upperSection flex items-center justify-between'>
					<div className='flex'>
						<img src='/dashboard/todoIcon.png' alt='todo-icon' />
						<span className='text-[#FF6767] inline-block ml-2 font-semibold text-xl'>
							To-Do
						</span>
					</div>
					<div className='flex cursor-pointer'>
						<Plus color='#FF6767' />
						<span className='inline-block text-[#A1A3AB]'>Add Task</span>
					</div>
				</div>
				<div className='dateSection w-full'>
					20{' '}
					{dayjs()
						.month(5 - 1)
						.format('MMM')}
					<span className='text-[#A1A3AB] ml-2'>
						<span className='font-bold text-xl'>&#183;</span>
						{isToday('30/05/2026') && 'Today'}
					</span>
				</div>
				<div className='todo-section'>
					<Todo />
				</div>
			</div>
		</>
	)
}

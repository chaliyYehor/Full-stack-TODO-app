import { days } from '../../constants/constants'
import dayjs from 'dayjs'

export default function Header() {
	const dayName = days[new Date().getDay()]
	const date = dayjs().format('DD/MM/YYYY')
	return (
		<header
			className='bg-[#F8F8F8] shadow-md flex items-center justify-between px-18 pt-10 pb-6.25
		'
		>
			<div className='logo text-4xl'>
				<span className='text-[#FF6767]'>Dash</span>
				<span className='text-[#000000]'>board</span>
			</div>
			<div className='date'>
				<p className='text-black'>{dayName}</p>
				<p className='text-[#3ABEFF]'>{date}</p>
			</div>
		</header>
	)
}

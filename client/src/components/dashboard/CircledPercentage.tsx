import clsx from 'clsx'
import { useEffect, useState } from 'react'

type Props = {
	percent: number | undefined
	state: 'Completed' | 'In Progress' | 'Not Started'
}

export default function CircledPercentage({ percent = 0, state }: Props) {
	const radius = 50
	const size = 120
	const circumference = 2 * Math.PI * radius
	const offset = circumference - (percent / 100) * circumference
	const center = size / 2

	const [strokeColor, setStrokeColor] = useState('')

	useEffect(() => {
		if (state === 'Completed') {
			setStrokeColor('#05A301')
		} else if (state === 'In Progress') {
			setStrokeColor('#0225FF')
		} else {
			setStrokeColor('#F21E1E')
		}
	})

	return (
		<>
			<div className='progressBar'>
				<svg width={size} height={size} xmlns='http://www.w3.org/2000/svg ' className='transition-all duration-500 ease-in-out'>
					<circle
						strokeWidth='13'
						stroke='#D9D9D9'
						cx={center}
						cy={center}
						r={radius}
						fill='none'
						className='transition-all duration-500 ease-in-out'
					/>

					<circle
						strokeWidth='13'
						stroke={strokeColor}
						cx={center}
						cy={center}
						r={radius}
						fill='none'
						strokeDasharray={circumference}
						strokeDashoffset={offset}
						strokeLinecap='butt'
						transform={`rotate(-90 ${center} ${center})`}
						className='transition-all duration-500 ease-out'
					/>
				</svg>

				<div className='infoText text-md font-semibold relative mt-6'>
					<div
						style={{
							backgroundColor: strokeColor,
						}}
						className='statusIcon'
					></div>
					{state}
				</div>
				<span
					className={clsx(
						percent === 100 ? 'left-[30%]' : 'left-[35%]',
						'inline-block absolute top-[28%] text-xl font-bold',
					)}
				>
					{percent}%
				</span>
			</div>
		</>
	)
}

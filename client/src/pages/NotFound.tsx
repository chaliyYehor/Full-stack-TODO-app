import { Link } from 'react-router-dom'

function NotFound() {
	return (
		<div className='min-h-dvh w-full bg-[#FB8133] flex justify-center items-center p-4 sm:p-8 lg:p-15 overflow-auto'>
			<div className='err-content w-full min-h-[70dvh] rounded-4xl flex justify-center items-center'>
				<div className='w-full max-w-xl grid grid-rows-2 justify-items-center'>
					<img className='w-full max-w-140' src='/notFound.png' alt='404' />
					<div className='info flex flex-col justify-end items-center pb-22.5 gap-15'>
						<div className=' err-text uppercase'>OPPS! Page not found</div>
						<Link to={'/dashboard'} className='px-10.25 py-3 backHome rounded-4xl uppercase transition cursor-pointer bg-[#FB8133] hover:bg-[#f66810] text-white  text-[24px] shadow-2xl'>
							Back to home
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default NotFound

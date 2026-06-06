import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DatePickerInput from './DatePickerInput'
import TextField from '@mui/material/TextField'
import { useFormContext } from 'react-hook-form'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import type { CreateTaskFormType } from '../../../schemas/createTaskFormSchema'
import { priorityInputs } from '../../../constants/constants'

export default function TaskCreationForm() {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateTaskFormType>()

	return (
		<div className='formWrapper grid grid-cols-[65%_1fr] p-3.75 border-2 border-[#A1A3AB] mt-10'>
			<div className='firstColumn flex flex-col gap-5'>
				<div className='title flex flex-col gap-2'>
					<h3 className='font-semibold text-xl'>Title</h3>
					<TextField
						{...register('title')}
						error={!!errors.title}
						helperText={errors.title?.message}
					/>
				</div>
				<div className='date flex flex-col gap-2'>
					<h3 className='font-semibold text-xl'>Date</h3>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePickerInput />
					</LocalizationProvider>
				</div>

				<div className='priority flex flex-col gap-2'>
					<h3 className='font-semibold text-xl'>Priority</h3>
					<div className='inputs flex justify-around items-center'>
						{priorityInputs.map((inp, i) => (
							<label
								key={inp}
								className='w-fit relative cursor-pointer flex gap-2 select-none'
							>
								<div
									style={{
										backgroundColor:
											i === 0 ? '#F21E1E' : i === 1 ? '#3ABEFF' : '#05A301',
									}}
									className='statusIcon'
								/>
								{inp}
								<input
									className='w-5 cursor-pointer'
									type='radio'
									{...register('priority')}
									value={inp}
								/>
							</label>
						))}
					</div>
				</div>

				<div className='description flex flex-col gap-2'>
					<h3 className='font-semibold text-xl'>Description</h3>
					<TextareaAutosize
						placeholder='Start writing here...'
						minRows={5}
						maxRows={5}
						{...register('taskDescription')}
						className='w-full resize-none overflow-y-auto rounded border border-[#c4c4c4] bg-transparent px-3.5 py-4 text-base leading-6 outline outline-0 outline-offset-0 transition-colors placeholder:text-[#757575] hover:border-black focus:border-[#1976d2] focus:outline-1 focus:outline-[#1976d2]'
					/>
				</div>
			</div>
			<div className='secondColumn'></div>
		</div>
	)
}

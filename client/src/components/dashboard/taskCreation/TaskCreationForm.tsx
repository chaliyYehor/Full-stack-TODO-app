import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DatePickerInput from './DatePickerInput'
import TextField from '@mui/material/TextField'
import { useFormContext } from 'react-hook-form'
import type { CreateTaskFormType } from '../../../schemas/createTaskFormSchema'

export default function TaskCreationForm() {
	const {
		register,
		formState: { errors },
	} = useFormContext<CreateTaskFormType>()

	return (
		<div className='formWrapper grid grid-cols-[65%_1fr] p-3.75 border-2 border-[#A1A3AB]'>
			<div className='firstColumn'>
				<div className='title flex flex-col gap-2'>
					<h3 className='font-semibold text-xl'>Title</h3>
					<TextField
						label='Title'
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
			</div>
			<div className='secondColumn'></div>
		</div>
	)
}

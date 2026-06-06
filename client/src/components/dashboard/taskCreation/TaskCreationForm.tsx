import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DatePickerInput from './DatePickerInput'

export default function TaskCreationForm() {
	return (
		<div className='formWrapper p-3.75 border-2 border-[#A1A3AB]'>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DatePickerInput />
			</LocalizationProvider>
		</div>
	)
}

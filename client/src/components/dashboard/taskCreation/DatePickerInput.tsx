import { Controller, useFormContext } from 'react-hook-form'
import type { CreateTaskFormType } from '../../../schemas/createTaskFormSchema'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

export default function DatePickerInput() {
	const { control } = useFormContext<CreateTaskFormType>()

	return (
		<Controller
			name='date'
			control={control}
			render={({ field, fieldState }) => (
				<DatePicker
					label='Due date'
					value={field.value}
					onChange={date => field.onChange(date)}
					slotProps={{
						textField: {
							sx: {
								'& .MuiInputBase-input': {
									fontSize: '1.1rem',
								},
								'& .MuiInputLabel-root': {
									fontSize: '1.1rem',
								},
							},
							error: !!fieldState.error,
							helperText: fieldState.error?.message,
						},
					}}
				/>
			)}
		/>
	)
}

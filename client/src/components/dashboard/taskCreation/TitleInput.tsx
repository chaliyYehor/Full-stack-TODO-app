import { Controller, useFormContext } from 'react-hook-form'
import type { CreateTaskFormType } from '../../../schemas/createTaskFormSchema'
import TextField from '@mui/material/TextField'

export default function TitleInput() {
	const { control } = useFormContext<CreateTaskFormType>()

	return (
		<Controller
			name='title'
			control={control}
			render={({ field, fieldState }) => (
				<TextField
					{...field}
					error={!!fieldState.error}
					helperText={fieldState.error?.message}
				/>
			)}
		/>
	)
}

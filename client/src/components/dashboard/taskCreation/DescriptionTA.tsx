import TextareaAutosize from '@mui/material/TextareaAutosize'
import { Controller, useFormContext } from 'react-hook-form'
import type { CreateTaskFormType } from '../../../schemas/createTaskFormSchema'

export default function DescriptionTA() {
	const { control } = useFormContext<CreateTaskFormType>()
	return (
		<Controller
			control={control}
			name='taskDescription'
			render={({ field, fieldState }) => (
				<>
					<TextareaAutosize
						placeholder='Start writing here...'
						{...field}
						value={field.value ?? ''}
						minRows={5}
						maxRows={5}
						className={`w-full resize-none overflow-y-auto rounded border bg-transparent px-3.5 py-4 text-base leading-6 outline-0 outline-offset-0 transition-colors placeholder:text-[#757575] hover:border-black focus:outline-1 ${
							fieldState.error
								? 'border-red-500 focus:border-red-500 focus:outline-red-500'
								: 'border-[#c4c4c4] focus:border-[#1976d2] focus:outline-[#1976d2]'
						}`}
					/>
					{fieldState.error && (
						<p className='text-red-500'>{fieldState.error.message}</p>
					)}
				</>
			)}
		/>
	)
}

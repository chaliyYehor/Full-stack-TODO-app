import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DatePickerInput from './DatePickerInput'
import { Controller, useFormContext } from 'react-hook-form'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import type { CreateTaskFormType } from '../../../schemas/createTaskFormSchema'
import { priorityInputs } from '../../../constants/constants'
import FileUpload from './FileUpload'
import { useState } from 'react'
import TitleInput from './TitleInput'

export default function TaskCreationForm() {
	const [image, setImage] = useState<File | null>(null)

	const {
		register,
		control,
		setValue,
		formState: { errors },
	} = useFormContext<CreateTaskFormType>()

	console.log(errors)

	return (
		<div className='formWrapper grid grid-cols-[65%_1fr] gap-5 p-3.75 border-2 border-[#A1A3AB] mt-10'>
			<div className='firstColumn flex flex-col gap-5'>
				<div className='title flex flex-col gap-2'>
					<h3 className='font-semibold text-xl'>Title</h3>
					<TitleInput />
				</div>
				<div className='date flex flex-col gap-2'>
					<h3 className='font-semibold text-xl'>Date</h3>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePickerInput />
					</LocalizationProvider>
					{errors.date && <p className='text-red-500'>{errors.date.message}</p>}
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
					{errors.priority && (
						<p className='text-red-500'>{errors.priority.message}</p>
					)}
				</div>

				<div className='description flex flex-col gap-2'>
					<h3 className='font-semibold text-xl'>Description</h3>

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
				</div>
			</div>
			<div className='secondColumn self-end'>
				<FileUpload
					image={image}
					setImage={file => {
						setImage(file)
						setValue('image', file ?? undefined, {
							shouldDirty: true,
							shouldValidate: true,
						})
					}}
				/>
				{errors.image && (
					<p className='text-red-500 text-center'>{errors.image.message}</p>
				)}
			</div>
		</div>
	)
}

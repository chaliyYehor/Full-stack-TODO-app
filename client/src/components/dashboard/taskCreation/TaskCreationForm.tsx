import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DatePickerInput from './DatePickerInput'
import { useFormContext } from 'react-hook-form'
import type { CreateTaskFormType } from '../../../schemas/createTaskFormSchema'
import { priorityInputs } from '../../../constants/constants'
import FileUpload from './FileUpload'
import { useState } from 'react'
import TitleInput from './TitleInput'
import DescriptionTA from './DescriptionTA'
import type { TodoType } from '../../../schemas/todosSchema'

type Props = {
	isFormEdit: boolean
	prevTodo?: TodoType | null
}

export default function TaskCreationForm({}: Props) {
	const [image, setImage] = useState<File | null>(null)

	const {
		register,
		setValue,
		formState: { errors },
	} = useFormContext<CreateTaskFormType>()

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

					<DescriptionTA />
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

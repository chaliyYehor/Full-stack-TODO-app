import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import {
	createTaskFormSchema,
	type CreateTaskFormType,
} from '../../../schemas/createTaskFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import TaskCreationForm from './TaskCreationForm'
import { useCreateTodo } from '../../../hooks/useCreateTodo'
import axios from 'axios'
import { useState } from 'react'

type Props = {
	closeTask: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateTask({ closeTask }: Props) {
	const [authError, setAuthError] = useState()

	const methods = useForm<CreateTaskFormType>({
		resolver: zodResolver(createTaskFormSchema),
		defaultValues: {
			title: '',
			priority: 'Low',
			taskDescription: '',
			image: undefined,
			date: null,
		},
		mode: 'onSubmit',
	})

	const { handleSubmit } = methods

	const { mutateAsync: createTask, isPending } = useCreateTodo()

	const onSubmit: SubmitHandler<CreateTaskFormType> = async data => {
		const payload = {
			...data,
			date: data.date ? data.date.toISOString() : '',
			taskDescription: data.taskDescription ?? '',
		}

		const formData = new FormData()

		formData.append('title', payload.title)
		formData.append('priority', payload.priority)
		formData.append('date', payload.date)
		formData.append('taskDescription', payload.taskDescription)
		if (payload.image) {
			formData.append('image', payload.image)
		}

		try {
			await createTask(formData)
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setAuthError(error.response?.data?.msg)
				return
			}
		}
	}

	return (
		<>
			<div className='absolute left-[50%] top-[50%] translate-[-50%] z-20 w-255 h-200 bg-[#F9F9F9] p-12.5'>
				<div className='upperPart flex w-full justify-between'>
					<div className='relative'>
						<h3 className='addNewTaskHeading text-xl font-bold inline-block'>
							Add New Task
						</h3>
					</div>
					<button
						type='button'
						className='cursor-pointer text-xl font-semibold underline'
						onClick={() => closeTask(false)}
					>
						Go Back
					</button>
				</div>

				<form className='createTaskForm' onSubmit={handleSubmit(onSubmit)}>
					<FormProvider {...methods}>
						<TaskCreationForm />
					</FormProvider>

					<button
						type='submit'
						className='bg-[#F24E1E] hover:bg-[#df3400] active:bg-[#f68663] transition text-[#FFFFFF] w-25 h-13 py-3 px-5 rounded-md flex justify-center items-center cursor-pointer mt-8 font-semibold text-xl'
					>
						{isPending ? <div className='loader ' /> : 'Done'}
					</button>
				</form>
				{authError && (
					<p className='text-red-500 text-sm m-0 p-0 absolute bottom-0'>
						{authError}
					</p>
				)}
			</div>
		</>
	)
}

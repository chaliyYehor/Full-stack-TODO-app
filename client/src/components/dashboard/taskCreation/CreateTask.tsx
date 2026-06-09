import { useFormContext, type SubmitHandler } from 'react-hook-form'
import { type CreateTaskFormType } from '../../../schemas/createTaskFormSchema'
import TaskCreationForm from './TaskCreationForm'
import { useCreateTodo } from '../../../hooks/useCreateTodo'
import axios from 'axios'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

type Props = {
	closeTask?: React.Dispatch<React.SetStateAction<boolean>>
	editTask: boolean
}

export default function CreateTask({ closeTask, editTask }: Props) {
	const navigate = useNavigate()

	const [authError, setAuthError] = useState()

	const { mutateAsync: createTask, isPending } = useCreateTodo()

	const queryClient = useQueryClient()

	const { handleSubmit, reset } = useFormContext<CreateTaskFormType>()

	const onCreateSubmit: SubmitHandler<CreateTaskFormType> = async data => {
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
		formData.append('status', 'Not Started')
		if (payload.image) {
			formData.append('image', payload.image)
		}

		try {
			await createTask(formData)
			reset()
			closeTask && closeTask(false)
			queryClient.invalidateQueries({ queryKey: ['todos'] })
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setAuthError(error.response?.data?.msg)
				return
			}
		}
	}

	return (
		<>
			<div
				className={clsx(
					!editTask ? 'absolute left-[50%] top-[50%] translate-[-50%]' : '',
					'z-20 w-255 h-200 bg-[#F9F9F9] p-12.5',
				)}
			>
				<div className='upperPart flex w-full justify-between'>
					<div className='relative'>
						<h3 className='addNewTaskHeading text-xl font-bold inline-block'>
							{editTask ? 'Edit Task' : 'Add New Task'}
						</h3>
					</div>
					<button
						type='button'
						className='cursor-pointer text-xl font-semibold underline'
						onClick={() => {
							if (editTask) {
								navigate(-1)
							} else {
								closeTask && closeTask(false)
							}
						}}
					>
						Go Back
					</button>
				</div>

				<form className='createTaskForm' onSubmit={handleSubmit(onCreateSubmit)}>
					<TaskCreationForm />
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

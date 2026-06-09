import {
	FormProvider,
	useForm,
	type SubmitHandler,
} from 'react-hook-form'
import {
	createTaskFormSchema,
	type CreateTaskFormType,
} from '../../../schemas/createTaskFormSchema'
import TaskCreationForm from './TaskCreationForm'
import { useCreateTodo } from '../../../hooks/useCreateTodo'
import axios from 'axios'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetAllTodos } from '../../../hooks/useGetAllTodos'
import { editTaskFormSchema } from '../../../schemas/editTaskFormSchema'
import dayjs from 'dayjs'

type Props = {
	closeTask?: React.Dispatch<React.SetStateAction<boolean>>
	editTask: boolean
	editTaskId?: string
}

export default function CreateTask({ closeTask, editTask, editTaskId }: Props) {
	const [authError, setAuthError] = useState()

	const navigate = useNavigate()

	const queryClient = useQueryClient()
	const { mutateAsync: createTask } = useCreateTodo()

	const createFormMethods = useForm<CreateTaskFormType>({
		resolver: zodResolver(createTaskFormSchema),
		defaultValues: {
			title: '',
			priority: 'Low',
			taskDescription: '',
			image: undefined,
			date: null,
			status: 'Not Started',
		},
		mode: 'onSubmit',
	})

	const { handleSubmit: handleCreate, reset: resetCreate } = createFormMethods

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
			resetCreate()
			closeTask && closeTask(false)
			queryClient.invalidateQueries({ queryKey: ['todos'] })
			console.log('success')
		} catch (error) {
			if (axios.isAxiosError(error)) {
				setAuthError(error.response?.data?.msg)
				return
			}
		}
	}

	const { data: todos, isPending } = useGetAllTodos()
	const oldTodo = todos?.find(todo => todo._id === editTaskId)
	const onEditSubmit: SubmitHandler<CreateTaskFormType> = async data => {
		const changedFields: Partial<CreateTaskFormType> = {}

		if (data.title !== oldTodo?.title) {
			changedFields.title = data.title
		}
		if (data.priority !== oldTodo?.priority) {
			changedFields.priority = data.priority
		}

		if (
			data.taskDescription &&
			data.taskDescription !== oldTodo?.taskDescription
		) {
			changedFields.taskDescription = data.taskDescription
		}

		if (data.date !== null && data.date.toISOString() !== oldTodo?.date) {
			changedFields.date = data.date
		}

		if (data.image) {
			changedFields.image = data.image
		}

		const parsed = editTaskFormSchema.safeParse(changedFields)

		if (!parsed.success) {
			console.log(parsed.error)
			return
		}

		const formData = new FormData()
		Object.entries(parsed.data).forEach(([key, value]) => {
			if (value === undefined || value === null) return

			if (value instanceof File) {
				formData.append(key, value)
				return
			}

			if (dayjs.isDayjs(value)) {
				formData.append(key, value.toISOString())
				return
			}

			formData.append(key, String(value))
		})
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
				<FormProvider {...createFormMethods}>
					<form
						className='createTaskForm'
						onSubmit={handleCreate(editTask ? onEditSubmit : onCreateSubmit)}
					>
						<TaskCreationForm
							isFormEdit={editTask}
							taskPriority={editTask ? oldTodo?.priority : null}
						/>
						<button
							type='submit'
							className='bg-[#F24E1E] hover:bg-[#df3400] active:bg-[#f68663] transition text-[#FFFFFF] w-25 h-13 py-3 px-5 rounded-md flex justify-center items-center cursor-pointer mt-8 font-semibold text-xl'
						>
							{isPending ? <div className='loader ' /> : 'Done'}
						</button>
					</form>
				</FormProvider>
				{authError && (
					<p className='text-red-500 text-sm m-0 p-0 absolute bottom-0'>
						{authError}
					</p>
				)}
			</div>
		</>
	)
}

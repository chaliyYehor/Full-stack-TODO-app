import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form'
import {
	createTaskFormSchema,
	type CreateTaskFormType,
} from '../../../schemas/createTaskFormSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import TaskCreationForm from './TaskCreationForm'

type Props = {
	closeTask: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CreateTask({ closeTask }: Props) {
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

	const onSubmit: SubmitHandler<CreateTaskFormType> = data => {
		console.log(data)
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
						className='bg-[#F24E1E] hover:bg-[#df3400] active:bg-[#f68663] transition text-[#FFFFFF] py-3 px-5 rounded-md cursor-pointer mt-8 font-semibold text-xl'
					>
						Done
					</button>
				</form>
			</div>
		</>
	)
}

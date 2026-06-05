import { FormProvider, useForm } from 'react-hook-form'
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
		},
	})

	return (
		<>
			<div className='absolute left-[50%] translate-x-[-50%] z-20 top-39.5 w-255 h-180 bg-[#F9F9F9] p-12.5'>
				<div className='upperPart flex w-full justify-between'>
					<div className='relative'>
						<h3 className='addNewTaskHeading text-xl font-bold inline-block'>
							Add New Task
						</h3>
					</div>
					<button
						className='cursor-pointer text-xl font-semibold underline'
						onClick={() => closeTask(false)}
					>
						Go Back
					</button>
				</div>

				<FormProvider {...methods}>
					<TaskCreationForm />
				</FormProvider>
			</div>
		</>
	)
}

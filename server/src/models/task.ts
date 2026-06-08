import { ObjectId } from 'mongodb'
import mongoose, { HydratedDocument, Model } from 'mongoose'

interface Task {
	title: string
	priority: string
	date: string
	creatorID: mongoose.Types.ObjectId
	taskDescription: string
	imageUrl: string
	imagePublicId: string
}

interface TaskMethods {}

type TaskModel = Model<Task, {}, TaskMethods>

export type TaskDoc = HydratedDocument<Task, TaskMethods>

const TaskSchema = new mongoose.Schema<Task, TaskModel, TaskMethods>(
	{
		title: {
			type: String,
			required: [true, 'Please provide a Title'],
			minLength: 2,
			maxLength: 40,
		},
		priority: {
			type: String,
			enum: ['Extreme', 'Moderate', 'Low'],
			required: true,
		},
		date: {
			type: String,
		},
		taskDescription: {
			type: String,
			minLength: 5,
		},
		imageUrl: {
			type: String,
		},
		imagePublicId: {
			type: String,
		},
		creatorID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
)

export default mongoose.model<Task, TaskModel>('Task', TaskSchema)

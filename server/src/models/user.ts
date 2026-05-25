import bcrypt from 'bcryptjs'
import { SignOptions } from 'jsonwebtoken'
import mongoose, { HydratedDocument, Model } from 'mongoose'
import jwt from 'jsonwebtoken'

interface User {
	firstName: string
	lastName: string
	username: string
	email: string
	password: string
}

interface UserMethods {
	createJWT(): string
	comparePassword(candidatePassword: string): Promise<boolean>
}

type UserModel = Model<User, {}, UserMethods>

export type UserDoc = HydratedDocument<User, UserMethods>

const UserSchema = new mongoose.Schema<User, UserModel, UserMethods>({
	firstName: {
		type: String,
		required: [true, 'Please provide First Name'],
		minLength: 2,
		maxLength: 50,
	},
	lastName: {
		type: String,
		required: [true, 'Please provide First Name'],
		minLength: 2,
		maxLength: 50,
	},
	username: {
		type: String,
		required: [true, 'Please provide a username'],
		minLength: 3,
		maxlength: 50,
		unique: true,
	},
	email: {
		type: String,
		required: [true, 'Please provide an email'],
		match: [
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
			'Please provide valid email',
		],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
	},
})

UserSchema.pre('save', async function (this: UserDoc) {
	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (
	this: UserDoc,
	candidatePassword: string,
) {
	const isMatch = await bcrypt.compare(candidatePassword, this.password)
	return isMatch
}

UserSchema.methods.createJWT = function (this: UserDoc) {
	const jwtSecret = process.env.JWT_SECRET
	if (!jwtSecret) {
		throw new Error('JWT_SECRET was not found')
	}

	const jwtLifetime = process.env.JWT_LIFETIME as
		| SignOptions['expiresIn']
		| undefined

	return jwt.sign({ userID: this._id, username: this.username }, jwtSecret, {
		expiresIn: jwtLifetime,
	})
}

export default mongoose.model<User, UserModel>('User', UserSchema)

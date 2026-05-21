import { StatusCodes } from 'http-status-codes'
import { CustomApiError } from './custom-api.js'

export class AnauthenticatedError extends CustomApiError {
	constructor(message: string) {
		super(message, StatusCodes.UNAUTHORIZED)
	}
}
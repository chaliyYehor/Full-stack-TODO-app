declare global {
	namespace Express {
		interface Request {
			user?: {
				userID: string,
				username: string
			}
		}
	}
}

export {}
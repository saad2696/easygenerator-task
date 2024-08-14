import { User } from "../models/user";

// This can be used to reset the user state
export const userDefault: User = {
		firebase_uid: '',
		role: null, 
		data: {
			displayName: 'Guest User',
			photoURL: '',
			email: '',
            loginRedirectUrl: ''
		},
		fetched: false
}

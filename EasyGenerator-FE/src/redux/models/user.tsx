export type User = {
	firebase_uid: string;
	role: string[] | string | null;
	email?: string;
	data: {
		displayName: string;
		photoURL?: string;
		email?: string;
		loginRedirectUrl?: string;
	};
	fetched: boolean
};

'use client'
import * as React from "react";
import ExitTest from "@/app/components/pages/ExitTest";


const checkAuthStatus = async () : Promise<{ userInfo: {email: string, email_verified: boolean, sub: string, username: string}}> => {
	const response = await fetch(`http://localhost:3001/auth/`, {
		credentials: 'include'
	});
	const data = await response.json();
	return data;
};

export default function MainPage() {
	const [user, setUser] = React.useState<{  userInfo: { email: string, email_verified: boolean, sub: string, username: string } } | null>(null);

	React.useEffect(() => {
		const fetchUser = async () => {
			const userData = await checkAuthStatus();
			setUser(userData);
		};
		fetchUser();
	}, []);

	if (!user) {
		return <div>Please Login.</div>;
	}

	console.log(user.userInfo);
	return (
		<ExitTest/>
	);
}
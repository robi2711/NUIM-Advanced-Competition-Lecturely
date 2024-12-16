import * as React from 'react';
import MainNav from "@/app/components/common/MainNav";
import CssBaseline from "@mui/material/CssBaseline";
import {useUser} from "@/app/components/services/UserContext";

export default function ExitTest() {
	const { userInfo } = useUser();

	if (!userInfo) {
		return null;
	}

	return (
		<CssBaseline>
		<MainNav />
		<div>
			{userInfo ? (
				<div>
					<p>Username: {userInfo.username}</p>
					<p>Email: {userInfo.email}</p>
					<p>Email Verified: {userInfo.email_verified ? 'Yes' : 'No'}</p>
					<p>Sub: {userInfo.sub}</p>
				</div>
			) : (
				<p>No user info available</p>
			)}
		</div>
		</CssBaseline>
	);
};

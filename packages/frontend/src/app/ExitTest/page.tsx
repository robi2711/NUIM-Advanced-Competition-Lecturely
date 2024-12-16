'use client'
import * as React from "react";
import ExitTest from "@/app/components/pages/ExitTest";
import {useUser} from "@/app/components/types/UserContext";

export default function MainPage() {
	const { userInfo } = useUser();
	console.log("info "+ userInfo);
	return (
		<ExitTest/>

	);
}
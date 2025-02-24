'use client'
import * as React from "react";
import SignIn from "@/app/components/authentication/SignIn";
import {Suspense } from 'react';

export default function SignInPage() {

	return (
		<Suspense fallback={<div>Loading...</div>}>
		<SignIn/>
		</Suspense>
	);
}
import { createContext, useContext, useState, useEffect } from 'react';

interface UserInfo {
	username: string;
	email: string;
	email_verified: boolean;
	sub: string;
}

interface UserContextType {
	userInfo: UserInfo | null;
	setUserInfo: (userInfo: UserInfo) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	const updateUserInfo = (userInfo: UserInfo) => {
		setUserInfo(userInfo);
		sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
	};

	useEffect(() => {
		const storedUserInfo = sessionStorage.getItem('userInfo');
		if (storedUserInfo) {
			setUserInfo(JSON.parse(storedUserInfo));
		}
	}, []);

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo: updateUserInfo }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
import { createContext, useContext, useState } from 'react';

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

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
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
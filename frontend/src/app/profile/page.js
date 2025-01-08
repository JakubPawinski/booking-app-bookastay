'use client';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton/LogoutButton';

export default function ProfilePage() {
	
	const [profileData, setProfileData] = useState(null);

	useEffect(() => {
		const token = Cookies.get('token');
		console.log(token);

		if (token) {
			console.log();

			const decodedData = jwtDecode(token);
			console.log(decodedData);

			setProfileData(decodedData);
		}
	}, []);

	if (!profileData) {
		return <div>Loading...</div>;
	}

	return (
		<div className='profile-page-inner'>
			<div className='profile-menu'>
				<div className='profile-info'>
					<div className='profile-avatar'></div>
					<div className='profile-name'>{`${profileData.firstName} ${profileData.lastName}`}</div>
					<div className='profile-role'>{profileData.role}</div>
				</div>
				<LogoutButton />
			</div>
			<div className='content'></div>
		</div>
	);
}

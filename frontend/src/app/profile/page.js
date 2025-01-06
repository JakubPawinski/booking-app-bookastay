'use client';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
	const router = useRouter();
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

	const handleLogout = () => {
		Cookies.remove('token');
		window.dispatchEvent(new Event('reload'));
		router.push('/');
	};

	return (
		<div className='profile-page-inner'>
			<div className='profile-menu'>
				<div className='profile-info'>
					<div className='profile-avatar'></div>
					<div className='profile-name'>{`${profileData.firstName} ${profileData.lastName}`}</div>
					<div className='profile-role'>{profileData.role}</div>
				</div>

				<button className='logout-button' onClick={handleLogout}>
					Log out
				</button>
			</div>
			<div className='content'></div>
		</div>
	);
}

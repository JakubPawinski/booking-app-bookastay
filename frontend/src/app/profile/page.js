'use client';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import Loading from '../components/Loading/Loading';
import ProfileInfoButton from '../components/ProfileInfoButton/ProfileInfoButton';

export default function ProfilePage() {
	const [profileData, setProfileData] = useState(null);
	const [selectedTab, setSelectedTab] = useState('account');

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

	const handleSelect = (selectedTab) => {
		setSelectedTab(selectedTab);
	};

	if (!profileData) {
		return <Loading />;
	}

	return (
		<div className='profile-page-inner'>
			<div className='profile-menu'>
				<div className='profile-info'>
					<div className='profile-avatar'></div>
					<div className='profile-name'>{`${profileData.firstName} ${profileData.lastName}`}</div>
					<div className='profile-role'>{profileData.role}</div>
				</div>
				<ProfileInfoButton
					isSelected={selectedTab === 'account'}
					onSelect={() => handleSelect('account')}
				>
					Manage your account
				</ProfileInfoButton>
				{profileData.role === 'owner' && (
					<ProfileInfoButton
						isSelected={selectedTab === 'manage-accomodations'}
						onSelect={() => handleSelect('manage-accomodations')}
					>
						Manage your accomodations
					</ProfileInfoButton>
				)}
				{profileData.role === 'owner' && (
					<ProfileInfoButton
						isSelected={selectedTab === 'add-accomodation'}
						onSelect={() => handleSelect('add-accomodation')}
					>
						Add your accomodation
					</ProfileInfoButton>
				)}
				<LogoutButton />
			</div>
			<div className='content'></div>
		</div>
	);
}

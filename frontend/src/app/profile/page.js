'use client';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import LogoutButton from '../components/LogoutButton/LogoutButton';
import Loading from '../components/Loading/Loading';
import ProfileInfoButton from '../components/_ProfilePage/ProfileInfoButton/ProfileInfoButton';
import ManageAccount from '../components/_ProfilePage/ManageAccount/ManageAccount';
import AddAccomodation from '../components/_ProfilePage/AddAccomodation/AddAccomodation';
import ManageAccomodation from '../components/_ProfilePage/ManageAccomodation/ManageAccomodation';
import Reservations from '../components/_ProfilePage/Reservations/Reservations';
import _ from 'lodash';
import axios from 'axios';
import { ENDPOINTS } from '../../config.js';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
	const [profileData, setProfileData] = useState(null);
	const [selectedTab, setSelectedTab] = useState('account');
	const [refresh, setRefresh] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = Cookies.get('token');
		console.log(token);

		const fetchData = async (id) => {
			const response = await axios.get(`${ENDPOINTS.USERS}/id/${id}`, {
				withCredentials: true,
			});
			console.log(response.data);
			setProfileData(response.data);
		};

		if (token) {
			const decodedData = jwtDecode(token);
			console.log(decodedData);
			fetchData(decodedData.id);
		} else {
			console.log('no token');
			router.push('/auth');
		}
	}, [refresh]);

	const handleSelect = (selectedTab) => {
		setSelectedTab(selectedTab);
	};

	const refreshData = () => {
		setRefresh((prev) => !prev);
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
					<div className='profile-role'>{_.capitalize(profileData.role)}</div>
				</div>
				<ProfileInfoButton
					isSelected={selectedTab === 'account'}
					onSelect={() => handleSelect('account')}
				>
					Manage your account
				</ProfileInfoButton>
				{(profileData.role === 'user' || profileData.role === 'owner') && (
					<ProfileInfoButton
						isSelected={selectedTab === 'reservations'}
						onSelect={() => handleSelect('reservations')}
					>
						My bookings
					</ProfileInfoButton>
				)}
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
						onSelect={() => handleSelect('add-accomodations')}
					>
						Add your accomodation
					</ProfileInfoButton>
				)}

				<LogoutButton />
			</div>
			<div className='content'>
				{selectedTab === 'account' && <ManageAccount onUpdate={refreshData} />}
				{selectedTab === 'add-accomodations' && <AddAccomodation />}
				{selectedTab === 'reservations' && <Reservations />}
				{selectedTab === 'manage-accomodations' && <ManageAccomodation />}
			</div>
		</div>
	);
}

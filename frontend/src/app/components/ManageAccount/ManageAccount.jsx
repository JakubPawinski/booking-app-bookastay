import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAccount.scss';
import UpdateForm from '../UpdateForm/UpdateForm';
import ChangePassword from '../ChangePasswordForm/ChangePasswordForm.jsx';

export default function ManageAccount({ onUpdate }) {
	const [profileData, setProfileData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		role: '',
		phone: '',
		password: '',
	});
	const [updateData, setUpdateData] = useState({});
	const [refresh, setRefresh] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			const token = Cookies.get('token');

			if (token) {
				const decodedData = jwtDecode(token);
				// console.log(decodedData.id);

				const data = await axios.get(
					`http://localhost:4000/api/users/id/${decodedData.id}`,
					{ withCredentials: true }
				);

				setProfileData({
					firstName: data.data.firstName || '',
					lastName: data.data.lastName || '',
					email: data.data.email || '',
					role: data.data.role || '',
					phone: data.data.phone || '',
					password: data.data.password || '',
					id: data.data._id,
				});

				if (onUpdate) {
					onUpdate();
				}
			}
		};
		fetchData();
	}, [refresh, onUpdate]);

	const defaultValues = {
		firstName: {
			describtion: 'Let us know your first name',
			type: 'firstName',
			defaultValue: profileData.firstName,
			label: 'First name',
		},
		lastName: {
			describtion: 'Let us know your last name',
			type: 'lastName',
			defaultValue: profileData.lastName,
			label: 'Last name',
		},
		email: {
			describtion: 'Let us know your email',
			type: 'email',
			defaultValue: profileData.email,
			label: 'Email',
		},
		phone: {
			describtion: 'Let us know your phone number',
			type: 'phone',
			defaultValue: profileData.phone,
			label: 'Phone',
		},
	};
	const handleRefresh = () => {
		setRefresh((prev) => !prev);
	};

	const deleteAccount = async () => {};

	return (
		<div className='profile-page-manage-account'>
			<div className='profile-info-personal-details'>
				<h3>Personal details</h3>
				<div className='section-describtion'>
					Update your account information.
				</div>
				<div className='personal-details-first-name section'>
					<p>First name</p>{' '}
					<UpdateForm
						describtion={defaultValues.firstName.describtion}
						type={defaultValues.firstName.type}
						defaultValue={defaultValues.firstName.defaultValue}
						label={defaultValues.firstName.label}
						profileData={profileData}
						onUpdate={handleRefresh}
					/>
				</div>
				<div className='personal-details-last-name section'>
					<p>Last name</p>{' '}
					<UpdateForm
						describtion={defaultValues.lastName.describtion}
						type={defaultValues.lastName.type}
						defaultValue={defaultValues.lastName.defaultValue}
						label={defaultValues.lastName.label}
						profileData={profileData}
						onUpdate={handleRefresh}
					/>
				</div>
				<div className='personal-details-email section'>
					<p>Email</p>
					<UpdateForm
						describtion={defaultValues.email.describtion}
						type={defaultValues.email.type}
						defaultValue={profileData.email}
						label={defaultValues.email.label}
						profileData={profileData}
						onUpdate={handleRefresh}
					/>
				</div>
				<div className='personal-details-phone section'>
					<p>Phone</p>
					<UpdateForm
						describtion={defaultValues.phone.describtion}
						type={defaultValues.phone.type}
						defaultValue={defaultValues.phone.defaultValue}
						label={defaultValues.phone.label}
						profileData={profileData}
						onUpdate={handleRefresh}
					/>
				</div>
			</div>
			<div className='profile-info-security-settings'>
				<h3>Security settings</h3>
				<div className='section-describtion'>
					Change your security settings or delete your account.
				</div>

				<div className='section'>
					<p>Change password</p>
					<ChangePassword profileData={profileData} />
				</div>

				<div className='section'>
					<p>Delete account</p>

					<div className='delete-account-content main-content'>
						<div className='delete-account-describtion describtion'>
							Permanently delete your account
						</div>

						<button onClick={deleteAccount}>Delete account</button>
					</div>
				</div>
			</div>
		</div>
	);
}

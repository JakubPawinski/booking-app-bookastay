import { useState } from 'react';
import axios from 'axios';
import { update } from 'lodash';
import { useRouter } from 'next/navigation';
import { ENDPOINTS } from '../../../config';
import Cookies from 'js-cookie';

export default function ChangePassword({ profileData }) {
	const router = useRouter();
	const [isActive, setIsActive] = useState(false);
	const [updateData, setUpdateData] = useState({
		'current-password': '',
		'new-password': '',
		'confirm-password': '',
	});

	const handleChange = (e) => {
		setUpdateData({ ...updateData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (
				updateData['new-password'] !== updateData['confirm-password'] ||
				updateData['new-password'] === ''
			) {
				console.log('passwords do not match');
				alert('Passwords do not match');
				return;
			}
			console.log('profileData', profileData);
			console.log('updateData', updateData);

			const response = await axios.put(
				`${ENDPOINTS.USERS}/${profileData.id}`,
				{
					password: updateData['new-password'],
					oldPassword: updateData['current-password'],
				},
				{ withCredentials: true }
			);
			console.log('change password');

			if (response.status === 200) {
				setIsActive(false);
				Cookies.remove('token');
				window.dispatchEvent(new Event('reload'));
				await router.push('/auth');
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div className='update-form-component form-component'>
			{!isActive ? (
				<div className='describtion'>Change your password</div>
			) : (
				<form>
					<label htmlFor='current-password'>Current password</label>
					<input
						type='password'
						name='current-password'
						onChange={handleChange}
					/>
					<label htmlFor='new-password'>New password</label>
					<input type='password' name='new-password' onChange={handleChange} />
					<label htmlFor='confirm-password'>Confirm password</label>
					<input
						type='password'
						name='confirm-password'
						onChange={handleChange}
					/>
				</form>
			)}
			<div className='buttons'>
				<button onClick={() => setIsActive(!isActive)}>
					{isActive ? 'Cancel' : 'Edit'}
				</button>
				{isActive && (
					<button className='submit-button' onClick={handleSubmit}>
						Save
					</button>
				)}
			</div>
		</div>
	);
}

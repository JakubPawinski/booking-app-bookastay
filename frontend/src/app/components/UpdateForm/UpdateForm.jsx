import { useState } from 'react';
import axios from 'axios';

import { ENDPOINTS } from '../../../config';

export default function UpdateForm({
	describtion,
	type,
	defaultValue,
	label,
	profileData,
	onUpdate,
}) {
	const [isActive, setIsActive] = useState(false);
	const [updateData, setUpdateData] = useState({});

	const handleChange = (e) => {
		setUpdateData({ ...updateData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.put(
				`${ENDPOINTS.USERS}/${profileData.id}`,
				updateData,
				{ withCredentials: true }
			);

			if (response.status === 200) {
				onUpdate();
				setIsActive(false);
				// console.log('updated');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='update-form-component'>
			{!isActive ? (
				<div className='describtion'>{describtion}</div>
			) : (
				<form>
					<label htmlFor={type}>{label}</label>
					<input
						type='text'
						name={type}
						defaultValue={defaultValue}
						onChange={handleChange}
					/>
				</form>
			)}
			<div className='buttons'>
				<button onClick={() => setIsActive(!isActive)}>
					{isActive ? 'Cancel' : 'Edit'}
				</button>
				{isActive && (
					<button
						type='submit'
						className='submit-button'
						onClick={handleSubmit}
					>
						Save
					</button>
				)}
			</div>
		</div>
	);
}

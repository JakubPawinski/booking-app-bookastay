import { useState } from 'react';
import axios from 'axios';

export default function ChangePassword() {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className='update-form-component form-component'>
			{!isActive ? (
				<div className='describtion'>Change your password</div>
			) : (
				<form>
					<label htmlFor='current-password'>Current password</label>
					<input type='password' name='current-password' />
					<label htmlFor='new-password'>New password</label>
					<input type='password' name='new-password' />
					<label htmlFor='confirm-password'>Confirm password</label>
					<input type='password' name='confirm-password' />
				</form>
			)}
			<div className='buttons'>
				<button onClick={() => setIsActive(!isActive)}>
					{isActive ? 'Cancel' : 'Edit'}
				</button>
				{isActive && (
					<button type='submit' className='submit-button'>
						Save
					</button>
				)}
			</div>
		</div>
	);
}

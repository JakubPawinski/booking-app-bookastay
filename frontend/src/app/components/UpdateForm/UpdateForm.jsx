import { useState } from 'react';
import axios from 'axios';

export default function UpdateForm({ describtion, type, defaultValue, label}) {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className='update-form-component'>
			{!isActive ? (
				<div className='describtion'>{describtion}</div>
			) : (
				<form>
					<label htmlFor={type}>{label}</label>
					<input type='text' name={type} defaultValue={defaultValue} />
				</form>
			)}
			<div className='buttons'>
				<button onClick={() => setIsActive(!isActive)}>
					{isActive ? 'Cancel' : 'Edit'}
				</button>
				{isActive && <button type='submit' className='submit-button'>Save</button>}
			</div>
		</div>
	);
}

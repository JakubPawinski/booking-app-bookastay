'use client';

import { useState } from 'react';
import ButtonAuth from '../components/ButtonAuth/ButtonAuth';
import axios from 'axios';

export default function AuthPage() {
	const [selectedButton, setSelectedButton] = useState('login');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSelect = (selectedButton) => {
		setSelectedButton(selectedButton);
	};

	const handleSubmit = async (e, eventType) => {
		e.preventDefault();
		if (eventType === 'login') {
			console.log(
				`Trying to log in with email: ${email} and password: ${password}`
			);

			try {
				const response = await axios.post(
					'http://localhost:4000/api/auth/login',
					{
						email: email,
						password: password,
					},
					{ withCredentials: true }
				);
				console.log(response);
			} catch (error) {
				alert('Invalid email or password');
				// console.error(error);
			}
		}
	};
	return (
		<div className='auth-page'>
			<div className='buttons'>
				<ButtonAuth
					isSelected={selectedButton === 'login'}
					onSelect={() => handleSelect('login')}
				>
					Log in
				</ButtonAuth>
				<ButtonAuth
					isSelected={selectedButton === 'register'}
					onSelect={() => handleSelect('register')}
				>
					Register
				</ButtonAuth>
			</div>
			<div className='form'>
				{selectedButton === 'login' ? (
					<form onSubmit={(e) => handleSubmit(e, selectedButton)}>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button type='submit'>Log in</button>
					</form>
				) : (
					<div>register</div>
				)}
			</div>
		</div>
	);
}

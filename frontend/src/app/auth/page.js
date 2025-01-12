'use client';

import { useState } from 'react';
import ButtonAuth from '../components/ButtonAuth/ButtonAuth';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
	const router = useRouter();
	const [selectedButton, setSelectedButton] = useState('login');

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [phone, setPhone] = useState('');
	const [role, setRole] = useState('');

	const handleSelect = (selectedButton) => {
		setSelectedButton(selectedButton);
	};

	const handleSubmit = async (e, eventType) => {
		console.log('submitting');

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
				// console.log(response);

				window.dispatchEvent(new Event('reload'));
				router.replace('/');
			} catch (error) {
				// alert('Invalid email or password');
				if (error.response.status === 400 || error.response.status === 404) {
					alert('Invalid email or password');
					return;
				}
				console.error(error);
			}
		}
		if (eventType === 'register') {
			console.log(
				`Trying to register with email: ${email}, password: ${password}, firstName: ${firstName}, lastName: ${lastName}, phone: ${phone}, role: ${role}`
			);

			try {
				const response = await axios.post(
					'http://localhost:4000/api/auth/register',
					{
						email: email,
						password: password,
						firstName: firstName,
						lastName: lastName,
						phone: phone,
						role: role,
					}
				);
				console.log(response);
				setSelectedButton('login');
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<div className='auth-page-page'>
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
						<input
							type='email'
							id='email'
							name='email'
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder='Email'
						/>
						<input
							type='password'
							id='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
						/>
						<button type='submit'>Log in</button>
					</form>
				) : (
					<form onSubmit={(e) => handleSubmit(e, selectedButton)}>
						<input
							type='text'
							id='firstName'
							name='firstName'
							onChange={(e) => {
								setFirstName(e.target.value);
							}}
							placeholder='First Name'
						></input>
						<input
							type='text'
							id='lastName'
							name='lastName'
							onChange={(e) => {
								setLastName(e.target.value);
							}}
							placeholder='Last Name'
						></input>
						<input
							type='email'
							id='email'
							name='email'
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							placeholder='Email'
						/>
						<input
							type='password'
							id='password'
							name='password'
							onChange={(e) => setPassword(e.target.value)}
							placeholder='Password'
						/>
						<input
							type='text'
							id='phone'
							name='phone'
							onChange={(e) => setPhone(e.target.value)}
							placeholder='Phone'
						></input>
						<select
							id='role'
							name='role'
							onChange={(e) => {
								console.log(e.target.value);
								setRole(e.target.value);
							}}
						>
							<option value='user'>User</option>
							<option value='owner'>Owner</option>
						</select>
						<button type='submit'>Register</button>
					</form>
				)}
			</div>
		</div>
	);
}

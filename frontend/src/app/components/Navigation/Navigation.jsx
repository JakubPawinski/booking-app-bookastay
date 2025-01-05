'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './Navigation.scss';

import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export default function Navigation() {
	const [isLogged, setIsLogged] = useState(false);
	const [userRole, setUserRole] = useState(null);

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			setIsLogged(true);

			const decodedData = jwtDecode(token);
			setUserRole(decodedData.role);
		}
	}, []);

	return (
		<div className='navbar'>
			<div className='navbar-main'>
				<div className='navbar-logo'>
					<Link href='/' className='navbar-link'>
						BookaStay
					</Link>
				</div>
				<div className='navbar-auth'>
					{!isLogged ? (
						<Link href='/auth'>Log in or Register</Link>
					) : (
						<Link href='/profile'>Profile</Link>
					)}
				</div>
			</div>
		</div>
	);
}

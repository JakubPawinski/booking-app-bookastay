'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './Navigation.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ProfileMenu from '../ProfileMenu/ProfileMenu.jsx';

import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export default function Navigation() {
	const [isLogged, setIsLogged] = useState(false);
	const [userRole, setUserRole] = useState(null);
	const [showMenu, setShowMenu] = useState(false);

	const checkAuth = () => {
		const token = Cookies.get('token');
		if (token) {
			setIsLogged(true);

			const decodedData = jwtDecode(token);
			setUserRole(decodedData.role);
		} else {
			setIsLogged(false);
			setUserRole(null);
		}
	};

	useEffect(() => {
		checkAuth();
		window.addEventListener('reload', checkAuth);
	}, []);

	return (
		<div className='navbar'>
			<div className='navbar-main'>
				<div className='navbar-logo'>
					<Link href='/' className='navbar-link'>
						BookaStay
					</Link>
				</div>

				<div className='navbar-right'>
					<div className='navbar-auth' onClick={() => setShowMenu(!showMenu)}>
						<FontAwesomeIcon className='icon bars' icon={faBars} />
						<FontAwesomeIcon className='icon profile' icon={faUserSolid} />
						{showMenu && <ProfileMenu isLogged={isLogged} />}
					</div>
				</div>
			</div>
		</div>
	);
}

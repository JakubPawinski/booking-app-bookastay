import Link from 'next/link';

export default function ProfileMenu({ isLogged }) {
	return (
		<div className='profile-menu'>
			{!isLogged && (
				<Link href='/auth' className='profile-menu-option'>
					Log in
				</Link>
			)}
			{!isLogged && (
				<Link href='/auth' className='profile-menu-option'>
					Sign up
				</Link>
			)}
			{isLogged && (
				<Link href='/profile' className='profile-menu-option'>
					Profile
				</Link>
			)}
		</div>
	);
}

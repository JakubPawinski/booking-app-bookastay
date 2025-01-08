import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function LogoutButton() {
	const router = useRouter();

	const handleLogout = () => {
		Cookies.remove('token');
		window.dispatchEvent(new Event('reload'));
		router.push('/');
	};
	return (
		<button className='logout-button' onClick={handleLogout}>
			Log out
		</button>
	);
}

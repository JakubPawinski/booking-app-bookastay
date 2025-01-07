import './styles/authPage.scss';

export const metadata = {
	title: 'Log in or Register',
};

export default function AuthLayout({ children }) {
	return <div className='auth-page-layout'>{children}</div>;
}

import './globals.scss';
import Navigation from './components/Navigation/Navigation';

export const metadata = {
	title: 'Reservation App',
	description: 'A reservation app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Navigation />
				<main>{children}</main>
			</body>
		</html>
	);
}

import './globals.scss';
import Navigation from './components/Navigation/Navigation';
import Notification from './components/Notification/Notification';

export const metadata = {
	title: 'Reservation App',
	description: 'A reservation app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body>
				<Navigation />
				<main>
					{children}
					<Notification />
				</main>
			</body>
		</html>
	);
}

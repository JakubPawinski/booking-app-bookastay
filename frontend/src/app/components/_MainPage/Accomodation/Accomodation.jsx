import './Accomodation.scss';
import { useRouter } from 'next/navigation';

export default function Accomodation({ accomodation }) {
	const router = useRouter();
	return (
		<li
			className='accomodation-card'
			onClick={() => router.push(`/accomodation/${accomodation._id}`)}
		>
			<div className='accomodation-image'></div>
			<div className='accomodation-content'>
				<h2>{accomodation.name}</h2>
				<p>
					{accomodation.location.city}, {accomodation.location.country}
				</p>
				<p className='price'>{accomodation.pricePerNight.low} pln</p>
			</div>
		</li>
	);
}

import './AddAccomodation.scss';
import { useState, useEffect } from 'react';
import { ENDPOINTS } from '@/config';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export default function AddAccomodation() {
	const [formData, setFormData] = useState({
		ownerID: '',
		name: '',
		description: '',
		location: {
			address: '',
			city: '',
			country: '',
		},
		pricePerNight: {
			low: '',
			medium: '',
			high: '',
		},
		availability: {
			startDate: '',
			endDate: '',
			isAvailable: true,
		},
		capacity: '',
	});

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			const decodedToken = jwtDecode(token);
			setFormData((prev) => ({
				...prev,
				ownerID: decodedToken.id,
			}));
		}
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name.includes('.')) {
			const [parent, child] = name.split('.');
			setFormData((prev) => ({
				...prev,
				[parent]: {
					...prev[parent],
					[child]: value,
				},
			}));
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
		console.log(formData);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(ENDPOINTS.HOUSES, formData, {
				withCredentials: true,
			});
			console.log(response);
		} catch (error) {
			console.error(error);
		}
		console.log('submitting');
	};
	return (
		<div className='add-accomodation-component profile-page-component'>
			<h3>Add Accomodation</h3>
			<div className='section-describtion'>
				Add your accomodation details here.
			</div>

			<form onSubmit={handleSubmit}>
				<div className='section'>
					<p>Basic Info</p>
					<div className='basic-info-inputs'>
						<input
							type='text'
							name='name'
							value={formData.name}
							onChange={handleChange}
							placeholder='Name'
							required
						/>
						<textarea
							name='description'
							value={formData.description}
							onChange={handleChange}
							placeholder='Description'
							required
						/>
					</div>
				</div>

				<div className='section'>
					<p>Location</p>
					<div>
						<input
							type='text'
							name='location.address'
							value={formData.location.address}
							onChange={handleChange}
							placeholder='Address'
							required
						/>
						<input
							type='text'
							name='location.city'
							value={formData.location.city}
							onChange={handleChange}
							placeholder='City'
							required
						/>
						<input
							type='text'
							name='location.country'
							value={formData.location.country}
							onChange={handleChange}
							placeholder='Country'
							required
						/>
					</div>
				</div>
				<div className='section'>
					<p>Pricing</p>
					<div className='price-inputs'>
						<input
							type='number'
							name='pricePerNight.low'
							value={formData.pricePerNight.low}
							onChange={handleChange}
							placeholder='Low season price'
						/>
						<input
							type='number'
							name='pricePerNight.medium'
							value={formData.pricePerNight.medium}
							onChange={handleChange}
							placeholder='Medium season price'
						/>
						<input
							type='number'
							name='pricePerNight.high'
							value={formData.pricePerNight.high}
							onChange={handleChange}
							placeholder='High season price'
						/>
					</div>
				</div>
				<div className='section'>
					<p>Availability</p>
					<div className='availability-inputs'>
						<input
							type='date'
							name='availability.startDate'
							value={formData.availability.startDate}
							onChange={handleChange}
							required
						/>
						<input
							type='date'
							name='availability.endDate'
							value={formData.availability.endDate}
							onChange={handleChange}
							required
						/>
					</div>
				</div>

				<div className='section'>
					<p>Capacity</p>
					<div>
						<input
							type='number'
							name='capacity'
							value={formData.capacity}
							onChange={handleChange}
							placeholder='Capacity'
							required
						/>
					</div>
				</div>

				<button type='submit'>Add Accommodation</button>
			</form>
		</div>
	);
}

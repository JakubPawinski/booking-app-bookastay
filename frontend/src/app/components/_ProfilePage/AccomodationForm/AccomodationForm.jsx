import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AccomodationForm.scss';

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	description: Yup.string().required('Description is required'),
	capacity: Yup.number()
		.required('Capacity is required')
		.positive('Capacity must be positive')
		.integer('Capacity must be an integer'),
	pricePerNight: Yup.object().shape({
		low: Yup.number()
			.required('Price in low season is required')
			.positive('Price must be positive'),
		medium: Yup.number()
			.required('Price in medium season is required')
			.positive('Price must be positive'),
		high: Yup.number()
			.required('Price in high season is required')
			.positive('Price must be positive'),
	}),
	location: Yup.object().shape({
		address: Yup.string().required('Address is required'),
		city: Yup.string().required('City is required'),
		country: Yup.string().required('Country is required'),
	}),
	availability: Yup.object().shape({
		startDate: Yup.date().required('Start date is required'),
		endDate: Yup.date().required('End date is required'),
	}),
});

export default function AccommodationForm({ initialValues, onSubmit }) {
	console.log('initialValues:', initialValues);
	const formattedInitialValues = {
		...initialValues,
		availability: {
			startDate: initialValues.availability?.startDate
				? new Date(initialValues.availability.startDate)
						.toISOString()
						.split('T')[0]
				: '',
			endDate: initialValues.availability?.endDate
				? new Date(initialValues.availability.endDate)
						.toISOString()
						.split('T')[0]
				: '',
		},
	};
	return (
		<div className='accommodation-form'>
			<Formik
				initialValues={formattedInitialValues}
				validationSchema={validationSchema}
				onSubmit={onSubmit}
			>
				{() => (
					<Form className='accommodation-form'>
						<div>
							<label htmlFor='name'>Name</label>
							<Field name='name' type='text' />
							<ErrorMessage name='name' component='div' className='error' />
						</div>
						<div>
							<label htmlFor='description'>Describtion</label>
							<Field name='description' as='textarea' />
							<ErrorMessage
								name='description'
								component='div'
								className='error'
							/>
						</div>
						<div>
							<label htmlFor='capacity'>Capacity</label>
							<Field name='capacity' type='number' />
							<ErrorMessage name='capacity' component='div' className='error' />
						</div>
						<div className='price-inputs'>
							<div>
								<label htmlFor='pricePerNight.low'>Price - low season</label>
								<Field name='pricePerNight.low' type='number' />
								<ErrorMessage
									name='pricePerNight.low'
									component='div'
									className='error'
								/>
							</div>

							<div>
								<label htmlFor='pricePerNight.medium'>
									Price - medium season
								</label>
								<Field name='pricePerNight.medium' type='number' />
								<ErrorMessage
									name='pricePerNight.medium'
									component='div'
									className='error'
								/>
							</div>

							<div>
								<label htmlFor='pricePerNight.high'>Price - high season</label>
								<Field name='pricePerNight.high' type='number' />
								<ErrorMessage
									name='pricePerNight.high'
									component='div'
									className='error'
								/>
							</div>
						</div>
						<div className='availability-inputs'>
							<div>
								<label htmlFor='availability.startDate'>Start Date</label>
								<Field name='availability.startDate' type='date' />
								<ErrorMessage
									name='availability.startDate'
									component='div'
									className='error'
								/>
							</div>
							<div>
								<label htmlFor='availability.endDate'>End Date</label>
								<Field name='availability.endDate' type='date' />
								<ErrorMessage
									name='availability.endDate'
									component='div'
									className='error'
								/>
							</div>
						</div>
						<button type='submit'>Save</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

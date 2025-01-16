import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
});

export default function AccommodationForm({ initialValues, onSubmit }) {
	return (
		<Formik
			initialValues={initialValues}
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
					<button type='submit'>Save</button>
				</Form>
			)}
		</Formik>
	);
}

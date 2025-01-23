import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ReviewSchema = Yup.object().shape({
	rating: Yup.number()
		.min(1, 'Minimal rating is 1')
		.max(5, 'Maximal rating is 5')
		.required('Rating is required'),
	comment: Yup.string()
		.min(5, 'Minimal length is 5 characters')
		.required('Comment is required'),
});

export default function ReviewForm({ houseId, handleSubmit }) {
	return (
		<Formik
			initialValues={{ rating: '', comment: '' }}
			validationSchema={ReviewSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				handleSubmit({ ...values, houseId });
				setSubmitting(false);
				resetForm();
			}}
		>
			{({ isSubmitting }) => (
				<Form>
					<div>
						<label htmlFor='rating'>Rating</label>
						<Field type='number' name='rating' />
						<ErrorMessage name='rating' component='div' />
					</div>
					<div>
						<label htmlFor='comment'>Comment</label>
						<Field as='textarea' name='comment' />
						<ErrorMessage name='comment' component='div' />
					</div>
					<button type='submit' disabled={isSubmitting}>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
}

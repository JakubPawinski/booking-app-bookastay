import { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '@/config';
import './SearchBar.scss';

export default function SearchBar({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${ENDPOINTS.HOUSES}/search`, {
				name: searchQuery,
			});
			console.log(response.data);
			onSearch(response.data);
		} catch (error) {
			console.error('Search error:', error);
		}
	};
	return (
		<form className='search-bar' onSubmit={handleSubmit}>
			<input
				type='text'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder='Search...'
				className='search-bar__input'
			/>
			<button type='submit' className='search-bar__button'>
				Search
			</button>
		</form>
	);
}

import React, {useState} from 'react'
const CONSTANTS = require('../constants.js');

function DiscogsUserSearchForm({ setReleaseListState }) {
	const [input, setInput] = useState('');

	const handleInputChange = (e) => {
		setInput(e.target.value);
	}

	const handleUserInput = (e) => {
		e.preventDefault();
		
		fetchRecsByPage(1).then(data => {
			let promiseList = [data];
			if (data.pagination.pages > 1) {
				let totalPages = data.pagination.pages;
				
				for (let page = 2; page <= totalPages; page++) {
					promiseList.push(fetchRecsByPage(page));
				}
			}
			return Promise.all(promiseList);
		}).then(pageList => {
			setReleaseListState(pageList);
		});
	}
	
	async function fetchRecsByPage(pageNumber) {
		return await fetch(`https://api.discogs.com/users/${input}/collection/folders/0/releases?page=${pageNumber}`, {
			method: 'GET',
			headers: {
				'Authorization': `Discogs key=${CONSTANTS.CONSUMER_KEY}, secret=${CONSTANTS.CONSUMER_SECRET}`,
			},
		}).then(res => res.json()).then(data => data).catch(err => console.log(err));
	} 

	return (
		<form className="username-form" onSubmit={handleUserInput}>
		<input 
			type="text" 
			placeholder="Enter username" 
			value={input} 
			name="text" 
			className="username-input"
			onChange={handleInputChange}
		/>
		<button className="username-button">
			Enter
		</button>
		</form>
	);
}

export default DiscogsUserSearchForm;

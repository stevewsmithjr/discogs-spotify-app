import React, {useState} from 'react'
import { getDiscogsCollectionPageList } from '../utils/processData.js';

function DiscogsUserSearchForm({ setReleaseListState }) {
	const [input, setInput] = useState('');

	const handleInputChange = (e) => {
		setInput(e.target.value);
	}

	const handleUserInput = (e) => {
		e.preventDefault();
		
		getDiscogsCollectionPageList(input).then(pageList => {
			setReleaseListState(pageList);
		});
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

import React, { useState } from 'react';
import { CircularProgress } from "@material-ui/core";
import './DiscogsUserSearchForm.css';

function DiscogsUserSearchForm({ isLoading, handleUserSearchFormSubmit }) {
	const [username, setUsername] = useState('');
	//const [isLoading, setIsLoading] = useState(false);

	const handleUsernameChange = (e) => {
		setUsername(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		handleUserSearchFormSubmit(username);
	}
	return (
		<main className="main">
			<h2 className="main__text">
				Connect your Discogs account to view your collection
			</h2>
			{isLoading ? (<div><CircularProgress /></div>) :
				(<form className="username__form" onSubmit={handleSubmit}>
					<h4 className="form__label">Enter Discogs username</h4>
					<input
						type="text"
						placeholder="Discogs username"
						minLength="1"
						maxLength="40"
						value={username}
						name="text"
						className="form__input form__input_type_username"
						onChange={handleUsernameChange}
					/>
					<button className="form__submit">
						Search
					</button>
				</form>)
			}
		</main>
	)

}

export default DiscogsUserSearchForm;
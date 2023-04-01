import React, { useState } from 'react';

function CityInput({ onCitySelected }) {
    const [city, setCity] = useState('');

    const handleInputChange = (event) => {
        setCity(event.target.value);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onCitySelected(city);
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Enter a city name" value={city} onChange={handleInputChange} />
            <button type="submit">Add city</button>
        </form>
    );
}

export default CityInput;


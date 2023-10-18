import React from 'react';
import './Favourite.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavoriteLocation } from '../redux/locationSlice';
import { fetchWeatherData } from '../api';
import { useNavigate } from 'react-router';

const Favourite = () => {
    const navigate = useNavigate();
    const favorites = useSelector((state) => state.auth.locations.favorites);
    const dispatch = useDispatch();
    console.log("dfdfd", favorites);

    const handleRemoveFavorite = (location) => {
        dispatch(removeFavoriteLocation(location));
    };

    const handleLocationClick = (location) => {
        dispatch(fetchWeatherData(location));
        navigate("/");
    };

    return (
        <div className='container'>
            <button type="button" className="btn btn-light" onClick={()=> navigate('/')}>Home</button>
            {favorites.length > 0 ? ( // Check if there are favorite locations
                <ul>
                    {favorites.map((location) => (
                        <li className='text-color' key={location}>
                            <span onClick={() => handleLocationClick(location)}>{location}</span>
                            <button onClick={() => handleRemoveFavorite(location)}>
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                // Render a message if there are no favorite locations
                <div className="no-favorites-message">You have no favorite locations. Add favorites from the WeatherApp.</div>
            )}
        </div>
    );
}

export default Favourite;

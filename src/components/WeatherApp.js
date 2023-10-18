import './WeatherApp.css';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchWeatherData } from '../api';
import { addFavoriteLocation } from '../redux/locationSlice';
import { setError } from '../redux/errorSlice';

// Icons
import favourite from "../Assets/fav.png";
import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import humidity_icon from "../Assets/humidity.png";

const WeatherApp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [wicon, setWicon] = useState(cloud_icon);
    const [location, setLocation] = useState("");
    const weatherData = useSelector((state) => state.auth.weather.data);

    console.log(weatherData);

    const handleAddFavorite = (location) => {
        dispatch(addFavoriteLocation(location));
    }

    const handleSearch = async () => {
        if (location.trim()) {
            try {
                //dispatch(setError(null)); // Clear any previous errors
                dispatch(fetchWeatherData(location));
            } catch (error) {
                dispatch(setError('Error fetching weather data.'));
            }
        } else {
            dispatch(setError('Please enter a valid location.'));
        }
    }

    const handleKeyDown = (e) => {
        if (e.code === "Enter") {
            handleSearch();
        }
    }
    if(weatherData){

    }
    useEffect(() => {
        try {
            if (weatherData.weather[0].icon === "01d" || weatherData.weather[0].icon === "01n") {
                setWicon(clear_icon);
            } else if (weatherData.weather[0].icon === "02d" || weatherData.weather[0].icon === "02n") {
                setWicon(cloud_icon);
            } else if (weatherData.weather[0].icon === "03d" || weatherData.weather[0].icon === "03n") {
                setWicon(drizzle_icon);
            } else if (weatherData.weather[0].icon === "09d" || weatherData.weather[0].icon === "09n") {
                setWicon(rain_icon);
            } else if (weatherData.weather[0].icon === "10d" || weatherData.weather[0].icon === "10n") {
                setWicon(rain_icon);
            } else if (weatherData.weather[0].icon === "13d" || weatherData.weather[0].icon === "13n") {
                setWicon(snow_icon);
            } else {
                setWicon(clear_icon);
            }
        } catch (error) {
            console.error("Error determining weather icon:", error);
        }
    }, [weatherData]);
    

    return (
        <div className='container'>
            <button type="button" className="btn btn-light" onClick={()=> navigate('/fav')}>Favourite</button>
            <div className='top-bar'>
                <input type='text' className='cityInput' placeholder='search' value={location} onKeyDown={handleKeyDown} onChange={(e) => setLocation(e.target.value)} />
                <div className='search-icon' onClick={handleSearch}>
                    <img src={search_icon} alt='search icon' />
                </div>
                <div className='search-icon' onClick={() => handleAddFavorite(location)}>
                    <img src={favourite} alt='search icon' />
                </div>
            </div>
            {weatherData ? ( // Check if weatherData is available
                <div>
                    <div className='weather-image'>
                        <img src={wicon} alt='cloud icon' />
                    </div>
                    <div className='weather-temp'>{weatherData.main["temp"].toFixed(1)}&deg;C</div>
                    <div className='weather-location'>{weatherData.name}</div>
                    <div className='data-container'>
                        <div className='element'>
                            <img src={humidity_icon} alt='' className='icon' />
                            <div className='data'>
                                <div className='humidity-percent'>{weatherData.main["humidity"]}%   </div>
                                <div className='text'>Humidity</div>
                            </div>
                        </div>
                        <div className='element'>
                            <img src={wind_icon} alt='' className='icon' />
                            <div className='data'>
                                <div className='humidity-percent'>{weatherData.wind.speed}Km/h</div>
                                <div className='text'>wind speed</div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // Render a message if weatherData is not available
                <div className="no-data-message">No weather data available. Enter a valid location and click 'Search'.</div>
            )}
        </div>
    );
}

export default WeatherApp;

import axios from 'axios';
import { setWeatherData} from './redux/weatherSlice';
import { setError } from './redux/errorSlice';

export const fetchWeatherData = (location) => {
    let api_key ="74c42b419e0a7c4900c7340f9a760552"
  return async (dispatch) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`);
      dispatch(setWeatherData(response.data));
    } catch (error) {
      dispatch(setError('Error fetching weather data.'));
    }
  };
};

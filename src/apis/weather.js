import axios from 'axios';

const KEY = '6f2892500d8c51980b4cad6f03352cae';
export default axios.create({
	baseURL: `https://api.openweathermap.org/data/2.5`,
	params: {
		appid: KEY,
		lang: window.navigator.language,
	},
});

import thunder_d from '../img/thunder_d.jpeg';
import thunder_n from '../img/thunder_n.jpeg';
import snow_d from '../img/snow_d.jpeg';
import snow_n from '../img/snow_n.jpeg';
import rain_d from '../img/rain_d.jpeg';
import rain_n from '../img/rain_n.jpeg';
import mist_d from '../img/mist_d.jpeg';
import mist_n from '../img/mist_n.jpeg';
import clouds_d from '../img/clouds_d.jpeg';
import clouds_n from '../img/clouds_n.jpeg';
import clear_d from '../img/clear_d.jpeg';
import clear_n from '../img/clear_n.jpeg';

const images = {
	Thunderstorm: {
		day: thunder_d,
		night: thunder_n,
	},
	Drizzle: {
		day: rain_d,
		night: rain_n,
	},
	Rain: {
		day: rain_d,
		night: rain_n,
	},
	Snow: {
		day: snow_d,
		night: snow_n,
	},
	Atmosphere: {
		day: mist_d,
		night: mist_n,
	},
	Clear: {
		day: clear_d,
		night: clear_n,
	},
	Clouds: {
		day: clouds_d,
		night: clouds_n,
	},
};

export default images;

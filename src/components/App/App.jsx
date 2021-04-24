import React from 'react';
import weather from '../../apis/weather';
import Content from '../Content/Content';
import Sidebar from '../Sidebar/Sidebar';
import './App.sass';
import images from '../../apis/images';
import 'normalize.css';
import MenuButton from '../MenuButton/MenuButton.jsx';

function getPosition() {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(
			pos => {
				resolve([pos.coords.latitude, pos.coords.longitude]);
			},
			() => reject(alert('Please, turn on geolocation'))
		);
	});
}
export default class App extends React.Component {
	state = {
		cities: [],
		citiesId: [],
		selected: null,
		bg: null,
		location: null,
		showSidebar: false,
	};

	search = async city => {
		try {
			const { data } = await weather.get('/weather', {
				params: {
					q: city,
					units: 'metric',
				},
			});
			if (this.state.citiesId.includes(data.id)) return;
			this.setState({
				cities: [...this.state.cities, data],
				citiesId: [...this.state.citiesId, data.id],
			});
		} catch (err) {
			alert(`Error ${err.response.status}: We could not find this city`);
		}
	};

	// Click on city tile
	onSelect(city) {
		const backgr = images[city.weather[0].main]
			? images[city.weather[0].main][
					city.dt < city.sys.sunrise || city.dt > city.sys.sunset ? 'night' : 'day'
			  ]
			: images['Atmosphere'][
					city.dt < city.sys.sunrise || city.dt > city.sys.sunset ? 'night' : 'day'
			  ];
		this.setState({
			selected: city,
			bg: backgr,
		});
		this.setState(state => {
			return { showSidebar: !state.showSidebar };
		});
	}

	getCurrentLocation = async () => {
		this.setState({ selected: 'loading' });
		const [lat, lon] = await getPosition();
		const { data } = await weather.get('/weather', {
			params: {
				lat,
				lon,
				units: 'metric',
			},
		});
		this.setState({
			selected: data,
			location: data,
			bg:
				images[data.weather[0].main][
					data.dt < data.sys.sunrise || data.dt > data.sys.sunset ? 'night' : 'day'
				],
		});
	};

	onDeleteClick(cityId) {
		this.setState(state => {
			let ids = state.citiesId.slice(0);
			let cities = state.cities.slice(0);
			ids = ids.filter(id => {
				return id !== cityId;
			});
			cities = cities.filter(city => city.id !== cityId);
			return { citiesId: ids, cities: cities };
		});
	}

	onMenuClick() {
		this.setState(state => {
			return { showSidebar: !state.showSidebar };
		});
	}

	componentDidMount() {
		const ids = JSON.parse(localStorage.getItem('cities'));
		this.setState({ citiesId: ids || [] });
		ids &&
			ids.map(async city => {
				const { data } = await weather.get('/weather', {
					params: {
						id: city,
						units: 'metric',
					},
				});
				this.setState({
					cities: [...this.state.cities, data],
				});
			});
	}

	componentDidUpdate() {
		localStorage.setItem('cities', JSON.stringify(this.state.citiesId));
	}

	render() {
		const bg = this.state.bg;
		return (
			<div className="app">
				{bg && <img className="bg" src={bg} alt="bg" />}
				<MenuButton
					onMenuClick={() => this.onMenuClick()}
					active={this.state.showSidebar ? 'active' : ''}
				/>
				<Sidebar
					visible={this.state.showSidebar}
					search={query => this.search(query)}
					cities={this.state.cities}
					onSelect={city => this.onSelect(city)}
					location={this.state.location}
					getCurrentLocation={() => this.getCurrentLocation()}
					onDeleteClick={cityId => this.onDeleteClick(cityId)}
				/>
				<Content selected={this.state.selected} />
			</div>
		);
	}
}

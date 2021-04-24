import React from 'react';
import Loader from '../Loader/Loader';
import './Content.sass';
import arrow from '../../img/arrow.svg';

export default class Content extends React.Component {
	render() {
		const data = this.props.selected;

		const options = {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			hour: 'numeric',
			minute: 'numeric',
			timeZone:
				data && `Etc/GMT${data.timezone >= 0 ? '-' : '+'}${Math.abs(data.timezone / 60 / 60)}`,
		};

		let today;
		if (data && data !== 'loading') {
			today = [
				// [0, 'High/Low', `${Math.round(data.main.temp_min)}°/ ${Math.round(data.main.temp_max)}°`],
				[1, 'Humidity', `${data.main.humidity}%`],
				[2, 'Pressure', `${Math.round(data.main.pressure * 0.750062)} mmHg`],
				[3, 'Wind', `${data.wind.speed} m/s`],
				[4, 'Feels Like', `${Math.round(data.main.feels_like)}°`],
			];
		}

		if (!data)
			return (
				<div className="content">
					<div className="weather">
						<div className="weather__hello">
							Welcome to Weather App! Please, search or select city to view information about
							weather
						</div>
					</div>
				</div>
			);

		if (data === 'loading') {
			return (
				<div className="content">
					<div className="weather">
						<Loader />
					</div>
				</div>
			);
		}
		return (
			<div className="content">
				<div className="weather">
					<div className="weather__main">
						<h2 className="weather__city">{data.name}</h2>
						<h4 className="weather__date">
							{new Date(data.dt * 1000).toLocaleString(window.navigator.language, options)}
						</h4>
						<div className="weather__temp">{`${Math.round(data.main.temp)}°`}</div>
						<div className="weather__description">{data.weather[0].description}</div>
					</div>
					<div className="weather__status">
						<div className="icon">
							<img
								src={data && `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
								alt=""
							/>
						</div>
						<div className="weather__day-temp">{`${Math.round(data.main.temp_min)}°/ ${Math.round(
							data.main.temp_max
						)}°`}</div>
					</div>
				</div>

				<div className="weather today">
					{today.map(i => {
						return (
							<div className="today__item" key={i[0]}>
								<div className="today__item__title">{i[1]}</div>
								<div className="today__item__value">
									{i[0] === 3 && (
										<div className="wind-icon__wrap">
											<img
												style={{ transform: `rotate(${data.wind.deg}deg)` }}
												src={arrow}
												alt=""
												className="wind-icon"
											></img>
										</div>
									)}{' '}
									{i[2]}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

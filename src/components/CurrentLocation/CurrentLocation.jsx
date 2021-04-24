import React from 'react';

export default class CurrentLocation extends React.Component {
	onLocationClick = async () => {
		if (!this.props.location) await this.props.getCurrentLocation();
		this.props.onSelect(this.props.location);
	};
	render() {
		const location = this.props.location;
		return (
			<div className="city__wrap">
				<button className="city" onClick={() => this.onLocationClick()}>
					<h3 className="city__title">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0V0z" fill="none" />
							<path
								className="city__location"
								d="M21 3L3 10.53v.98l6.84 2.65L12.48 21h.98L21 3z"
								fill="#fff"
							/>
						</svg>
						{location ? location.name : 'Current Location'}
					</h3>
					<div className="city__temp">{location ? `${Math.round(location.main.temp)} °C` : ''}</div>
				</button>
			</div>
		);
	}
}

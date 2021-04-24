import React from 'react';
import CurrentLocation from '../../CurrentLocation/CurrentLocation';
import City from '../City/City';
import './Cities.sass';

export default class Cities extends React.Component {
	state = {
		editable: false,
	};
	render() {
		const cities = this.props.cities.map(city => {
			return (
				<City
					key={city.id}
					editable={this.state.editable}
					city={city.name}
					cityData={city}
					onSelect={this.props.onSelect}
					onDeleteClick={() => this.props.onDeleteClick(city.id)}
				/>
			);
		});
		return (
			<div className="cities">
				<CurrentLocation
					location={this.props.location}
					getCurrentLocation={this.props.getCurrentLocation}
					onSelect={this.props.onSelect}
				/>
				{cities}

				{cities.length > 0 && (
					<div className="cities__edit">
						<button
							className="edit"
							onClick={() => this.setState({ editable: !this.state.editable })}
						>
							{this.state.editable ? 'Finish' : 'Edit'}
						</button>
					</div>
				)}
			</div>
		);
	}
}

import React from 'react';
import './City.sass';
import removeIcon from '../../../img/remove.svg';

export default class City extends React.Component {
	render() {
		return (
			<div className={`${this.props.editable ? 'editable' : ''} city__wrap`}>
				<button className="city__delete" onClick={this.props.onDeleteClick}>
					<img src={removeIcon} alt="" />
				</button>
				<button className="city" onClick={() => this.props.onSelect(this.props.cityData)}>
					<h3 className="city__title">{this.props.city}</h3>
					<div className="city__temp">{`${Math.round(this.props.cityData.main.temp)} °C`}</div>
				</button>
			</div>
		);
	}
}

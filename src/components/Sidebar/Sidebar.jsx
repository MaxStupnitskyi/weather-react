import React from 'react';
import Cities from './Cities/Cities';
import './Sidebar.sass';

export default class Sidebar extends React.Component {
	state = {
		query: '',
	};
	sumbitForm(e) {
		e.preventDefault();
		this.props.search(this.state.query);
		this.setState({ query: '' });
	}
	render() {
		return (
			<div className={`sidebar ${this.props.visible ? 'visible' : ''}`}>
				<form onSubmit={e => this.sumbitForm(e)} className="sidebar__search">
					<input
						className="sidebar__search__input"
						type="text"
						placeholder="Search city"
						value={this.state.query}
						onChange={e => this.setState({ query: e.target.value })}
					/>
				</form>
				<Cities
					location={this.props.location}
					getCurrentLocation={this.props.getCurrentLocation}
					cities={this.props.cities}
					onSelect={this.props.onSelect}
					onDeleteClick={this.props.onDeleteClick}
				/>
			</div>
		);
	}
}

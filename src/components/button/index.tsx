import React from 'react';

export interface ButtonProps {
	className?: string;
	buttonText: string;
	handleSubmit: () => void;
}

export default class Button extends React.Component<ButtonProps> {
	render() {
		return (
			<button className={this.props.className || ''} onClick={this.props.handleSubmit}>
				{this.props.buttonText}
			</button>
		);
	}
}

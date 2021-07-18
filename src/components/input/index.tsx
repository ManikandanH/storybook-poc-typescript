import React from 'react';

export type InputProps = InputCheckBoxProps | InputTextProps;

export interface InputElementProps {
	placeholder?: string;
	id?: string;
	className?: string;
}

export interface InputCheckBoxProps extends InputElementProps {
	type: 'checkbox';
	checked: boolean;
	handleBlur: (value: string | boolean, clearInput: () => void) => void;
}

export interface InputTextProps extends InputElementProps {
	type: 'text';
	value?: string;
	handleBlur: (value: string | boolean, clearInput: () => void) => void;
}

export interface InputState {
	inputValue: string;
	isChecked: boolean;
}

export default class Input extends React.Component<InputProps, InputState> {
	constructor(props: Readonly<InputProps>) {
		super(props);
		this.state = {
			inputValue: props.type === 'text' ? props.value || '' : '',
			isChecked: props.type === 'checkbox' ? props.checked : false,
		};
	}

	handleTextChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			inputValue: event.target.value,
		});
	};

	handleCheckBox = (event: React.ChangeEvent<HTMLInputElement>): void => {
		this.setState({
			isChecked: event.target.checked,
		});
		this.props.handleBlur(event.target.checked, this.clearInput);
	};

	clearInput = () => {
		this.setState({
			inputValue: '',
		});
	};

	render() {
		return this.props.type === 'checkbox' ? (
			<input
				type="checkbox"
				placeholder={this.props.placeholder}
				id={this.props.id}
				checked={this.state.isChecked}
				className={this.props.className || ''}
				onChange={this.handleCheckBox}
				onBlur={() => this.props.handleBlur(this.state.isChecked, this.clearInput)}
			/>
		) : (
			<input
				type={this.props.type}
				placeholder={this.props.placeholder}
				id={this.props.id}
				value={this.state.inputValue}
				className={this.props.className || ''}
				onChange={this.handleTextChange}
				onBlur={() => this.props.handleBlur(this.state.inputValue, this.clearInput)}
			/>
		);
	}
}

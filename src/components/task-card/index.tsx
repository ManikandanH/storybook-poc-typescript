import React from 'react';
import Button from '../button';
import Input from '../input';
import Typography from '../typography';
import './task-card.css';

export interface TaskCardProps {
	taskName: string;
	updateTaskName: (oldTaskName: string, newTaskName: string) => void;
	updateTaskStatus: (taskName: string, taskStatus: string | boolean) => void;
	deleteTask: (taskName: string) => void;
	isCompleted: boolean;
}

export interface TaskCardState {
	taskInputType: 'checkbox' | 'text';
	taskName: string;
	inputValue: string;
	checked: boolean;
	buttonAction1: string;
	buttonAction2: string;
	mainCardClassName: string;
	buttonAction1Class: string;
	buttonAction2Class: string;
	clearInput: (() => void) | null;
}

export default class TaskCard extends React.Component<TaskCardProps, TaskCardState> {
	constructor(props: Readonly<TaskCardProps>) {
		super(props);
		this.state = {
			taskInputType: 'checkbox',
			taskName: props.taskName,
			checked: props.isCompleted,
			inputValue: '',
			buttonAction1: 'Edit',
			buttonAction1Class: 'task-card-edit-cancel-button',
			buttonAction2: 'Delete',
			mainCardClassName: 'task-card-content-checkbox',
			buttonAction2Class: 'task-card-delete-button',
			clearInput: null,
		};
	}

	componentDidUpdate = (props: TaskCardProps) => {
		if (this.props.taskName !== props.taskName) {
			this.setState({
				taskName: this.props.taskName,
			});
		}
	};

	buttonAction1 = (): void => {
		if (this.state.buttonAction1 === 'Edit') {
			this.setState({
				buttonAction1: 'Cancel',
				buttonAction2: 'Save',
                inputValue: '',
				taskInputType: 'text',
				taskName: 'New name For ' + this.state.taskName,
				mainCardClassName: 'task-card-content-text',
				buttonAction2Class: 'task-card-save-button',
			});
		} else {
			this.setState({
				buttonAction1: 'Edit',
				buttonAction2: 'Delete',
				taskInputType: 'checkbox',
				taskName: this.props.taskName,
				mainCardClassName: 'task-card-content-checkbox',
				buttonAction2Class: 'task-card-delete-button',
			});
		}
		this.state.clearInput && this.state.clearInput();
	};

	buttonAction2 = (): void => {
		if (this.state.buttonAction2 === 'Delete') {
			this.props.deleteTask(this.state.taskName);
		} else {
			this.props.updateTaskName(this.props.taskName, this.state.inputValue);
			this.setState({
				buttonAction1: 'Edit',
				buttonAction2: 'Delete',
				taskName: this.props.taskName,
				taskInputType: 'checkbox',
				mainCardClassName: 'task-card-content-checkbox',
				buttonAction2Class: 'task-card-delete-button',
			});
		}
		this.state.clearInput && this.state.clearInput();
	};

	handleInput = (inputValue: string | boolean, clearInput: () => void): void => {
		if (this.state.taskInputType === 'checkbox') {
			this.props.updateTaskStatus(this.state.taskName, inputValue);
		} else {
			this.setState({ inputValue: inputValue as string });
		}
		this.setState({
			clearInput,
		});
	};
    
	render() {
		return (
			<div id="task-card">
				<div className={this.state.mainCardClassName} id="task-card-content">
					{this.state.taskInputType === 'checkbox' ? (
						<Input
							checked={this.state.checked}
							className="task-card-input-checkbox"
							handleBlur={this.handleInput}
							type="checkbox"
						/>
					) : (
						<Input
							value={this.state.inputValue}
							className="task-card-input-text"
							handleBlur={this.handleInput}
							type="text"
						/>
					)}

					<Typography
						className="task-card-name"
						textContent={this.state.taskName}
						Tag="h4"
					/>
				</div>
				<div id="task-card-actions">
					<Button
						className={this.state.buttonAction1Class}
						handleSubmit={this.buttonAction1}
						buttonText={this.state.buttonAction1}
					/>
					<Button
						className={this.state.buttonAction2Class}
						handleSubmit={this.buttonAction2}
						buttonText={this.state.buttonAction2}
					/>
				</div>
			</div>
		);
	}
}

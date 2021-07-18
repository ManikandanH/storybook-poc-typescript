/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from 'react';
import { MAIN_HEADING } from '../../constants';
import Button from '../button';
import Input from '../input';
import TaskDisplay from '../task-display';
import Typography from '../typography';
import './main-app.css';

export const TASK_ALL = 'All';
export const TASK_ACTIVE = 'Active';
export const TASK_COMPLETED = 'Completed';

export interface MainAppProps {}

export type TaskType = 'All' | 'Active' | 'Completed';

export interface TodoTask {
	taskName: string;
	isCompleted: boolean;
}

export interface TypeOfTaskButton {
	buttonText: TaskType;
	isSelected: boolean;
}

export interface MainAppState {
	taskInputValue: string;
	todoTasks: TodoTask[];
	typeOfTaskButtons: TypeOfTaskButton[];
	currentSelectedTaskType: TaskType;
	clearInput: (() => void) | null;
}

export default class MainApp extends React.Component<MainAppProps, MainAppState> {
	constructor(props: Readonly<MainAppProps>) {
		super(props);
		this.state = {
			taskInputValue: '',
			todoTasks: [],
			typeOfTaskButtons: [
				{
					buttonText: TASK_ALL,
					isSelected: true,
				},
				{
					buttonText: TASK_ACTIVE,
					isSelected: false,
				},
				{
					buttonText: TASK_COMPLETED,
					isSelected: false,
				},
			],
			currentSelectedTaskType: 'All',
			clearInput: null,
		};
	}

	handleInputValue = (taskInputValue: string | boolean, clearInput: () => void): void => {
		this.setState({
			taskInputValue: taskInputValue as string,
			clearInput,
		});
	};

	handleTaskTypeButton = (typeOfTaskButton: TaskType): void => {
		const cloneTypeOfTasks = [...this.state.typeOfTaskButtons];

		this.setState({
			typeOfTaskButtons: cloneTypeOfTasks.map((types) => ({
				...types,
				isSelected: typeOfTaskButton === types.buttonText ? true : false,
			})),
			currentSelectedTaskType: typeOfTaskButton,
		});
	};

	handleSubmit = () => {
		const newTask: TodoTask = {
			taskName: this.state.taskInputValue,
			isCompleted: false,
		};

		if (this.state.taskInputValue.length === 0) {
			alert('Enter some value');
		} else {
			this.setState(
				(prevState) => ({
					taskInputValue: '',
					todoTasks: [...prevState.todoTasks, newTask],
					currentSelectedTaskType: 'All',
				}),
				() => {
					this.state.clearInput && this.state.clearInput();
				},
			);
		}
	};

	updateTaskName = (oldTaskName: string, newTaskName: string): void => {
		this.setState((prevState) => ({
			todoTasks: prevState.todoTasks.map((task) => ({
				...task,
				taskName: task.taskName === oldTaskName ? newTaskName : task.taskName,
			})),
		}));
	};

	updateTaskStatus = (taskName: string, taskStatus: string | boolean): void => {
		this.setState((prevState) => ({
			todoTasks: prevState.todoTasks.map((task) => ({
				...task,
				isCompleted:
					task.taskName === taskName ? (taskStatus as boolean) : task.isCompleted,
			})),
		}));
	};

	deleteTask = (taskName: string): void => {
		this.setState({
			todoTasks: [...this.state.todoTasks.filter((task) => task.taskName !== taskName)],
		});
	};

	getCurrentTasks = (): TodoTask[] => {
		if (this.state.currentSelectedTaskType === 'Completed') {
			return [...this.state.todoTasks.filter((task) => task.isCompleted)];
		} else if (this.state.currentSelectedTaskType === 'Active') {
			return this.state.todoTasks.filter((task) => !task.isCompleted);
		}

		return this.state.todoTasks;
	};

	render() {
		return (
			<div className="main-app-container">
				<Typography textContent={MAIN_HEADING} className={'main-heading'} Tag="h1" />
				<div id="input-button-wrapper">
					<Input type="text" className="input-area" handleBlur={this.handleInputValue} />
					<Button
						buttonText="Add"
						className="add-button"
						handleSubmit={this.handleSubmit}
					/>
				</div>
				<div id="type-task-button-wrapper">
					{this.state.typeOfTaskButtons.map((types) => (
						<Button
							key={types.buttonText}
							buttonText={types.buttonText}
							className={`type-task-button ${
								types.isSelected
									? 'selected-type-task-button'
									: 'normal-type-task-button'
							}`}
							handleSubmit={() => this.handleTaskTypeButton(types.buttonText)}
						/>
					))}
				</div>
				<div id="task-display-area">
					<TaskDisplay
						updateTaskName={this.updateTaskName}
						tasks={this.getCurrentTasks()}
						deleteTask={this.deleteTask}
						updateTaskStatus={this.updateTaskStatus}
					/>
				</div>
			</div>
		);
	}
}

import React from 'react';
import { TodoTask } from '../main-app';
import TaskCard from '../task-card';
import Typography from '../typography';

export interface TaskDisplayProps {
	tasks: TodoTask[];
	updateTaskName: (oldTaskName: string, newTaskName: string) => void;
	updateTaskStatus: (taskName: string, taskStatus: string | boolean) => void;
	deleteTask: (taskName: string) => void;
}

export default class TaskDisplay extends React.Component<TaskDisplayProps> {
	render() {
		return (
			<div>
				<Typography
					Tag="h3"
					textContent={`${this.props.tasks && this.props.tasks.length} tasks remaining`}
				/>
				{this.props.tasks.map((task, index) => (
					<TaskCard
						updateTaskStatus={this.props.updateTaskStatus}
						key={index}
                        isCompleted={task.isCompleted}
						updateTaskName={this.props.updateTaskName}
						taskName={task.taskName}
                        deleteTask={this.props.deleteTask}
					/>
				))}
			</div>
		);
	}
}

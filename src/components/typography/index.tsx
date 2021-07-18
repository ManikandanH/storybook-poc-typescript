import React from 'react';

export interface TypographyProps {
	textContent: string;
	Tag: keyof JSX.IntrinsicElements;
	className?: string;
}

export default class Typography extends React.Component<TypographyProps> {
	render() {
		const { Tag, className, textContent } = this.props;

		return (
			<div className={className || ''}>
				<Tag>{textContent}</Tag>
			</div>
		);
	}
}

import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button from '../components/button';

export default {
	title: 'Button Component',
	component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const OneButton = Template.bind(
	{},
	{
		buttonText: 'One Button',
		className: 'Sample',
		handleSubmit: () => alert(`asd has been clicked`),
	},
);

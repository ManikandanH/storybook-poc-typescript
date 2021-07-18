import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Input from '../components/input';

export default {
	title: 'Input Component',
	component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const InputText = Template.bind({});

InputText.args = {
	type: 'text',
	value: 'Sample Value',
	handleBlur: (value) => alert(value),
	placeholder: 'something text',
};

export const InputCheckBox = Template.bind({});

InputCheckBox.args = {
	type: 'checkbox',
	checked: false,
	handleBlur: (value) => alert(value),
	placeholder: 'something checkbox',
};

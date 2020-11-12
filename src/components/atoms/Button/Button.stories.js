import React from 'react';
import { withKnobs, select } from '@storybook/addon-knobs';
import Button from './Button';

export default {
  title: 'Atoms/Button',
  component: Button,
  decorators: [withKnobs],
};

export const Primary = () => {
  const label = 'Colors';
  const options = {
    Primary: 'notes',
    Secondary: 'articles',
    Tertiary: 'twitters',
  };
  const defaultValue = 'notes';
  const groupId = 'GROUP-ID1';
  const value = select(label, options, defaultValue, groupId);
  return <Button activecolor={value}>Hello</Button>;
};
export const Secondary = () => <Button secondary>Secondary</Button>;

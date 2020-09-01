import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Heading from './Heading';

export default {
  title: 'Atoms/Heading',
  component: Heading,
  decorators: [withKnobs],
};

export const Normal = () => <Heading>I&apos;m normal</Heading>;
export const Big = () => <Heading big>I&apos;m big</Heading>;

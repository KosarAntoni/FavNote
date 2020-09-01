import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import StoryRouter from 'storybook-react-router';
import Sidebar from './Sidebar';

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  decorators: [StoryRouter()],
};

export const Normal = () => <Sidebar />;

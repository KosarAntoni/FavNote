import React from 'react';
import Input from './Input';

export default {
  title: 'Atoms/Input',
  component: Input,
};

export const Normal = () => <Input placeholder="login" />;
export const Search = () => <Input search placeholder="search" />;

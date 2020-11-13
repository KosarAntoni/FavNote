import React from 'react';
import noteIcon from 'assets/sticky-note-solid.svg';
import logoutIcon from 'assets/sign-out-alt-solid.svg';
import penIcon from 'assets/pen-alt-solid.svg';
import twitterIcon from 'assets/twitter-brands.svg';

import styled from 'styled-components';
import { theme } from 'theme/mainTheme';
import ButtonIcon from './ButtonIcon';

const YellowBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  height: 20rem;
  background-color: ${theme.notes};
`;

export default {
  title: 'Atoms/ButtonIcon',
  component: ButtonIcon,
  decorators: [(story) => (
    <YellowBackground>
      {story()}
    </YellowBackground>
  )],
};

export const Note = () => (
  <ButtonIcon icon={noteIcon} />
);

export const ActiveNote = () => (
  <ButtonIcon active icon={noteIcon} />
);

export const Logout = () => (
  <ButtonIcon icon={logoutIcon} />
);

export const Pen = () => (
  <ButtonIcon icon={penIcon} />
);

export const Twitter = () => (
  <ButtonIcon icon={twitterIcon} />
);

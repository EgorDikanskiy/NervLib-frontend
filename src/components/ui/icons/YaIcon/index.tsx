import React from 'react';
import ya from 'assets/ya.png';

export const YaIcon = ({ ...props }: React.ComponentProps<'img'>) => {
  return <img {...props} src={ya} alt="" />;
};

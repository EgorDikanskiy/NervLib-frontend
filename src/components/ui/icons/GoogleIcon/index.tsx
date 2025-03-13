import React from 'react';
import google from 'assets/google.png';

export const GoogleIcon = ({ ...props }: React.ComponentProps<'img'>) => {
  return <img {...props} src={google} alt="" />;
};

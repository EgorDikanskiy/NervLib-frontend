import React from 'react';
import lock from 'assets/lock.png';

export const LockIcon = ({ ...props }: React.ComponentProps<'img'>) => {
  return <img {...props} src={lock} alt="" />;
};

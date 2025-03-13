import React from 'react';

export const Button = ({ children, ...props }: React.ComponentProps<'button'>) => {
  return <button {...props}>{children}</button>;
};

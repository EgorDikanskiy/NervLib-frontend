import React from 'react';
import vk from 'assets/vk.png';

export const VkIcon = ({ ...props }: React.ComponentProps<'img'>) => {
  return <img {...props} src={vk} alt="" />;
};

import React from 'react';
import { Typography } from '@material-ui/core';

interface HeaderPropsInterface {
  title: string;
}

export const Header: React.FC<HeaderPropsInterface> = ({ title }) => {
  return (
    <Typography className="title" variant="h1" gutterBottom>
      {title}
    </Typography>
  );
};

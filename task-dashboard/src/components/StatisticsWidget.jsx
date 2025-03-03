import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatisticsWidget = ({ title, value }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="h4">{value}</Typography>
    </CardContent>
  </Card>
);

export default StatisticsWidget;
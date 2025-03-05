import React from "react";
import {
  Card,
  Typography,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";

const RecentActivityWidget = ({ activities }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">Recent Activity</Typography>
      <Divider sx={{ pb: 1 }} />
      <List>
        {activities.map((activity, index) => (
          <ListItem key={index}>
            <ListItemText primary={activity} />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default RecentActivityWidget;

"use client";

import React from "react";
import { Container, Grid } from "@mui/material";
import ThemeToggle from "../../components/ThemeToggle";
import StatisticsWidget from "../../components/StatisticsWidget";
import RecentActivityWidget from "../../components/RecentActivityWidget";
import ChartWidget from "../../components/ChartWidget";
import { ColorModeProvider } from "../../utils/themeToggle";

const Dashboard = () => {
  const chartOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  const chartSeries = [
    {
      name: "series-1",
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  return (
    <ColorModeProvider>
      <Container>
        <ThemeToggle />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticsWidget title="Users" value="1,200" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticsWidget title="Revenue" value="$34,000" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticsWidget title="Orders" value="320" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatisticsWidget title="Visits" value="10,000" />
          </Grid>
          <Grid item xs={12} md={6}>
            <RecentActivityWidget
              activities={["User1 logged in", "User2 placed an order"]}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartWidget options={chartOptions} series={chartSeries} />
          </Grid>
        </Grid>
      </Container>
    </ColorModeProvider>
  );
};

export default Dashboard;

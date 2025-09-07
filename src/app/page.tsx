"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { appData } from "@/data";
import { BarPlot } from "@mui/x-charts/BarChart";
import { ChartsGrid } from "@mui/x-charts/ChartsGrid";
import { ChartsXAxis } from "@mui/x-charts/ChartsXAxis";
import { ChartsYAxis } from "@mui/x-charts/ChartsYAxis";
import { ChartsTooltip } from "@mui/x-charts/ChartsTooltip";
import { LinePlot, MarkPlot } from "@mui/x-charts/LineChart";
import { ChartContainer } from "@mui/x-charts/ChartContainer";
import { ChartsLegend } from "@mui/x-charts/ChartsLegend";
import { Typography } from "@mui/material";

const newDataSet = appData.map(
  ({ Total_kWhs_Used, Avg_Daily_Temperature, Date: date }) => ({
    km: Total_kWhs_Used,
    temp: Avg_Daily_Temperature,
    date: new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    }),
  })
);

const series = [
  {
    type: "bar",
    dataKey: "km",
    color: "#00a35c",
    yAxisId: "leftAxis",
    label: "Total kWhs Used",
    legendLabel: "Total kWhs Used",
    marker: { shape: "square" },
  },
  {
    type: "line",
    dataKey: "temp",
    color: "#ff0000",
    yAxisId: "rightAxis",
    label: "Average Temperature",
    legendLabel: "Average Temperature",
    marker: { shape: "circle" },
  },
] as const;

export default function Home() {
  return (
    <div className="flex flex-1 items-center h-screen bg-green-100 p-4 rounded-2xl">
      <Stack sx={{ width: "100%" }}>
        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ mb: 2 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Box sx={{ width: 14, height: 14, bgcolor: "#00a35c" }} />
            <Typography variant="body2" className="text-black">
              Total kWhs Used
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                bgcolor: "#ff0000",
              }}
            />
            <Typography variant="body2" className="text-black">
              Average Temperature
            </Typography>
          </Stack>
        </Stack>

        <Box sx={{ width: "100%", height: "500px" }}>
          <ChartContainer
            series={series}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "date",
                label: "Date",
              },
            ]}
            yAxis={[
              {
                id: "leftAxis",
                width: 80,
                label: "kWh Used",
                valueFormatter: (value: number) => value.toLocaleString(),
              },
              {
                id: "rightAxis",
                position: "right",
                width: 80,
                label: "Temperature (°C)",
                valueFormatter: (value: number) => value.toFixed(1),
              },
            ]}
            dataset={newDataSet}
            height={500}
            margin={{ top: 60, bottom: 80, left: 100, right: 100 }}
          >
            <ChartsLegend />
            <ChartsGrid horizontal />
            <BarPlot />
            <LinePlot />
            <MarkPlot />

            <ChartsXAxis />
            <ChartsYAxis axisId="leftAxis" />
            <ChartsYAxis axisId="rightAxis" />
            <ChartsTooltip />
          </ChartContainer>
        </Box>
      </Stack>
    </div>
  );
}

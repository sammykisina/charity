import React, { useMemo } from "react";
import { type AxisOptions } from "react-charts";
import { addDays, addHours } from "date-fns";
import dynamic from "next/dynamic";
import type { Chart as ChartType } from "react-charts";
const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
}) as typeof ChartType;

type DailyDonation = {
  date: Date;
  donation_amount: number;
};

type Series = {
  label: string;
  data: DailyDonation[];
  // color: string;
};

const Line = () => {
  const start_date = new Date();

  /**
   * Components States
   */
  const data: Series[] = [
    {
      label: "Humanity",
      data: [
        {
          date: start_date,
          donation_amount: 200,
        },
        {
          date: addDays(start_date, 1),
          donation_amount: 500,
        },
        {
          date: addDays(start_date, 2),
          donation_amount: 400,
        },
        {
          date: addDays(start_date, 3),
          donation_amount: 600,
        },
        {
          date: addDays(start_date, 4),
          donation_amount: 1000,
        },
        {
          date: addDays(start_date, 5),
          donation_amount: 2500,
        },
        {
          date: addDays(start_date, 6),
          donation_amount: 2000,
        },
        {
          date: addDays(start_date, 7),
          donation_amount: 1875,
        },
      ],
    },
    {
      label: "Study",
      data: [
        {
          date: start_date,
          donation_amount: 150,
        },
        {
          date: addDays(start_date, 1),
          donation_amount: 300,
        },
        {
          date: addDays(start_date, 2),
          donation_amount: 450,
        },
        {
          date: addDays(start_date, 3),
          donation_amount: 700,
        },
        {
          date: addDays(start_date, 4),
          donation_amount: 1200,
        },
        {
          date: addDays(start_date, 5),
          donation_amount: 3000,
        },
        {
          date: addDays(start_date, 6),
          donation_amount: 1500,
        },
        {
          date: addDays(start_date, 7),
          donation_amount: 900,
        },
      ],
    },
  ];

  /**
   * Component Functions
   */

  const primaryAxis = useMemo(
    (): AxisOptions<DailyDonation> => ({
      getValue: (datum) => datum.date,
    }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<DailyDonation>[] => [
      {
        getValue: (datum) => datum.donation_amount,
        showGrid: false,
      },
    ],
    []
  );

  return (
    <section className="h-[28rem] w-full">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
          defaultColors: ["#46ABDF", "#FFD249"],
        }}
      />
    </section>
  );
};

export default Line;

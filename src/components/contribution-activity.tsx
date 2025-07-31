"use client";
import { useState, useEffect } from "react";
import ActivityCalendar from "react-activity-calendar";
import { useTheme } from "ternary-theme";

export default function ContributionActivity() {
  const { resolvedTheme } = useTheme();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const fetchData = await fetch(
        `https://github-contributions-api.jogruber.de/v4/startracex?y=${new Date().getFullYear()}`,
      ).then((res) => res.json());
      setData(fetchData.contributions);
    };
    fetchData();
  }, []);

  return (
    <ActivityCalendar
      loading={!data}
      data={data}
      colorScheme={resolvedTheme}
      hideColorLegend
      hideTotalCount
    />
  );
}

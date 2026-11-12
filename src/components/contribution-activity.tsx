"use client";
import { useEffect, useState } from "react";
import { ActivityCalendar, type Activity } from "react-activity-calendar";
import { useTheme } from "ternary-theme";

export default function ContributionActivity() {
  const { resolvedTheme } = useTheme();
  const [data, setData] = useState<Activity[]>();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const load = async () => {
      const response = await fetch(
        `https://github-contributions-api.jogruber.de/v4/startracex?y=${new Date().getFullYear()}`,
      );
      const body = await response.json();
      setData(body.contributions);
    };
    load();
  }, []);

  const colorScheme = resolvedTheme === "dark" ? "dark" : resolvedTheme === "light" ? "light" : undefined;

  return (
    <div className="min-h-32">
      {mounted ? (
        <ActivityCalendar
          loading={!data}
          data={data ?? []}
          colorScheme={colorScheme}
          showColorLegend={false}
          showTotalCount={false}
        />
      ) : null}
    </div>
  );
}

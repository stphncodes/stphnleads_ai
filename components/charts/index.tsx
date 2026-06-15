"use client";

import * as React from "react";
import {
  Area,
  AreaChart as ReAreaChart,
  Bar,
  BarChart as ReBarChart,
  Cell,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export const CHART_COLORS = {
  brand: "#6385ff",
  accent: "#a78bfa",
  sky: "#38bdf8",
  emerald: "#34d399",
  amber: "#fbbf24",
  rose: "#fb7185",
};

export const palette = [
  CHART_COLORS.brand,
  CHART_COLORS.accent,
  CHART_COLORS.sky,
  CHART_COLORS.emerald,
  CHART_COLORS.amber,
  CHART_COLORS.rose,
];

const axisProps = {
  stroke: "#6b7191",
  fontSize: 11,
  tickLine: false,
  axisLine: false,
} as const;

function TooltipBox({
  active,
  payload,
  label,
  formatter,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  formatter?: (v: number) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-strong rounded-xl px-3 py-2 text-xs shadow-xl">
      {label && <p className="mb-1 font-medium text-foreground">{label}</p>}
      <div className="space-y-1">
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-faint capitalize">{entry.name}</span>
            <span className="ml-auto font-semibold text-foreground">
              {formatter ? formatter(entry.value) : entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Area ---------------- */
export function AreaChart({
  data,
  series,
  formatter,
  height = 260,
}: {
  data: Array<Record<string, string | number>>;
  series: { key: string; color: string; label?: string }[];
  formatter?: (v: number) => string;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReAreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -8 }}>
        <defs>
          {series.map((s) => (
            <linearGradient
              key={s.key}
              id={`grad-${s.key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor={s.color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(255,255,255,0.05)"
        />
        <XAxis dataKey="label" {...axisProps} />
        <YAxis {...axisProps} width={48} />
        <Tooltip
          cursor={{ stroke: "rgba(255,255,255,0.1)" }}
          content={<TooltipBox formatter={formatter} />}
        />
        {series.map((s) => (
          <Area
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.label ?? s.key}
            stroke={s.color}
            strokeWidth={2}
            fill={`url(#grad-${s.key})`}
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        ))}
      </ReAreaChart>
    </ResponsiveContainer>
  );
}

/* ---------------- Bar ---------------- */
export function BarChart({
  data,
  dataKey,
  color = CHART_COLORS.brand,
  formatter,
  height = 260,
  horizontal = false,
}: {
  data: Array<Record<string, string | number>>;
  dataKey: string;
  color?: string;
  formatter?: (v: number) => string;
  height?: number;
  horizontal?: boolean;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReBarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ top: 8, right: 8, bottom: 0, left: horizontal ? 8 : -8 }}
      >
        <defs>
          <linearGradient id={`bar-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
            <stop offset="100%" stopColor={color} stopOpacity={0.35} />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
          stroke="rgba(255,255,255,0.05)"
        />
        {horizontal ? (
          <>
            <XAxis type="number" {...axisProps} />
            <YAxis type="category" dataKey="label" {...axisProps} width={92} />
          </>
        ) : (
          <>
            <XAxis dataKey="label" {...axisProps} />
            <YAxis {...axisProps} width={48} />
          </>
        )}
        <Tooltip
          cursor={{ fill: "rgba(255,255,255,0.04)" }}
          content={<TooltipBox formatter={formatter} />}
        />
        <Bar
          dataKey={dataKey}
          fill={`url(#bar-${dataKey})`}
          radius={horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}
          maxBarSize={44}
        />
      </ReBarChart>
    </ResponsiveContainer>
  );
}

/* ---------------- Donut ---------------- */
export function DonutChart({
  data,
  height = 220,
  formatter,
}: {
  data: { name: string; value: number; color: string }[];
  height?: number;
  formatter?: (v: number) => string;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RePieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius="62%"
          outerRadius="92%"
          paddingAngle={3}
          stroke="none"
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<TooltipBox formatter={formatter} />} />
      </RePieChart>
    </ResponsiveContainer>
  );
}

/* ---------------- Sparkline ---------------- */
export function Sparkline({
  data,
  color = CHART_COLORS.brand,
  height = 40,
}: {
  data: number[];
  color?: string;
  height?: number;
}) {
  const chartData = data.map((v, i) => ({ i, v }));
  const id = React.useId().replace(/:/g, "");
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ReAreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`spark-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.8}
          fill={`url(#spark-${id})`}
          isAnimationActive={false}
        />
      </ReAreaChart>
    </ResponsiveContainer>
  );
}

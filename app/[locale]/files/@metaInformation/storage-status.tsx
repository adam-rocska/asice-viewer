"use client";
import * as byteFormatter from '@/lib/byte-formatter';
import {FunctionComponent, ReactNode, use} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts';

export default (() => {
  if (typeof window === 'undefined') return null;
  const estimate = use(navigator.storage.estimate());
  const data: Data = [
    {label: 'Quota', value: estimate.quota ?? 0},
    {label: 'Usage', value: estimate.usage ?? 0},
  ];

  if (!data) return null;

  return (
    <ResponsiveContainer
      width="100%"
      aspect={Math.sqrt(2)}
    >
      <PieChart>
        <Legend verticalAlign="top" />
        <Pie
          data={data}
          dataKey="value"
          nameKey="label"
          legendType='circle'
          label={(data) => byteFormatter.format(data.payload.value)}
        >
          <Cell fill={'hsl(var(--nextui-primary)/var(--nextui-primary-opacity,var(--tw-bg-opacity)))'} />
          <Cell fill={'hsl(var(--nextui-danger)/var(--nextui-danger-opacity,var(--tw-bg-opacity)))'} />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}) satisfies FunctionComponent;

type Data = [
  quota: {label: ReactNode; value: number},
  usage: {label: ReactNode; value: number},
];
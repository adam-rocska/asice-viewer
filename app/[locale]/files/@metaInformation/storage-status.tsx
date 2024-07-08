"use client";
import * as byteFormatter from '@/lib/byte-formatter';
import {FunctionComponent, ReactNode, use} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Legend} from 'recharts';

export default (() => {
  if (typeof window === 'undefined') return null;
  let {usage, quota} = use(navigator.storage.estimate());
  if (usage === undefined) usage = usage ?? 0;
  if (quota === undefined) quota = quota ?? 0;
  const data: Data = [
    {label: 'Free', value: quota - usage},
    {label: 'Used', value: usage},
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
          <Cell
            fill={'hsl(var(--nextui-primary)/var(--nextui-primary-opacity,var(--tw-bg-opacity)))'}
            stroke={'hsl(var(--nextui-content1)/var(--nextui-content1-opacity,var(--tw-bg-opacity)))'}
          />
          <Cell
            fill={'hsl(var(--nextui-danger)/var(--nextui-danger-opacity,var(--tw-bg-opacity)))'}
            stroke={'hsl(var(--nextui-content1)/var(--nextui-content1-opacity,var(--tw-bg-opacity)))'}
          />
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}) satisfies FunctionComponent;

type Data = [
  free: {label: ReactNode; value: number},
  used: {label: ReactNode; value: number},
];
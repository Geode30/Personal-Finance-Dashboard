import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function FinancePieChart({ data, customizedLabel, colors }) {
    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={false}
                label={customizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontWeight: 'bold' }} />
        </PieChart>
    )
}
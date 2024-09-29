import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

export default function FinancePieChart({ data }) {

    const COLORS = ['#32CD32', '#D71515'];

    const renderCustomizedLabel = ({ x, y, name, value, index }) => {
        const positions = [
            { x: x + -40, y: y + -20 },
            { x: x + 40, y: y + 20 }
        ];

        const { x: adjustedX, y: adjustedY } = positions[index % positions.length];
        return (
            <text x={adjustedX} y={adjustedY} fontWeight="bold" textAnchor='middle' dominantBaseline="central" fill={COLORS[index]}>
                {name}: {value}
            </text>
        );
    };

    return (
        <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationDuration={500}
                isAnimationActive={true}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
            <Legend wrapperStyle={{ fontWeight: 'bold' }} iconType="circle" />
        </PieChart>
    )
}
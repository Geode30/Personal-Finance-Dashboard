    import React from 'react';
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

    const ProgressChart = ({ goal, current }) => {
        const data = [
            { name: 'Progress', Savings: current, Goal: goal },
        ];

        return (
            <div className='w-screen flex flex-col items-center mt-[2em] mr-[2em]'>
                <BarChart width={300} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontWeight: 'bold' }} iconType="circle" />
                    <Bar dataKey="Savings" fill="#4CAF50" barSize={20} /> {/* Adjust thickness here */}
                    <Bar dataKey="Goal" fill="#FF9800" barSize={20} />
                </BarChart>
            </div>
        );
    };

    export default ProgressChart;

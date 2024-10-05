    import React from 'react';
    import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

    const ProgressChart = ({ key1, key2, value1, value2, fill1, fill2 }) => {
        const data = [
            { name: '', [key1]: value1, [key2]: value2 },
        ];

        return (
            <div className='w-screen flex flex-col items-center mt-[2em] mr-[2em]'>
                <BarChart width={300} height={300} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend wrapperStyle={{ fontWeight: 'bold' }} iconType="circle" />
                    <Bar dataKey={key1} fill={fill1} barSize={20} />
                    <Bar dataKey={key2} fill={fill2} barSize={20} />
                </BarChart>
            </div>
        );
    };

    export default ProgressChart;

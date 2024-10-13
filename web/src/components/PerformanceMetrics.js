import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PerformanceMetrics = ({cluster}) => {
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Performance Metrics</h2>
            <div className="mb-8">
                <h3 className="text-lg">IOPS</h3>
                <div className="flex">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cluster?.metrics?.iops}>
                            <XAxis dataKey="time"/>
                            <YAxis />
                            <Tooltip/>
                            <Line type="monotone" dataKey="read" stroke="#8884d8" name="Read" />
                            <Line type="monotone" dataKey="write" stroke="#82ca9d" name="Write" />
                        </LineChart>
                    </ResponsiveContainer>
                    <div className="flex justify-between mt-2">
                        <div>
                            <p>Read</p>
                            <span>21.2k IOPS</span>
                        </div>
                        <div>
                            <p>Write</p>
                            <span>122.0 IOPS</span>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <h3 className="text-lg">Throughput</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={cluster?.metrics?.throughput}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="read" stroke="#8884d8" name="Read" />
                        <Line type="monotone" dataKey="write" stroke="#82ca9d" name="Write" />
                    </LineChart>
                </ResponsiveContainer>
                <div className="flex justify-between mt-2">
                    <span>Read: 10.3 KB/s</span>
                    <span>Write: 489.8 KB/s</span>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMetrics;

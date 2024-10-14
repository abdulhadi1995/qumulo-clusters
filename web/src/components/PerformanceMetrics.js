import React from 'react';
import {LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer} from 'recharts';
import {formatMemory, formatNumber} from "@/util/number";

const PerformanceMetrics = ({cluster , totalIops , totalThroughput}) => {
    return (
        <div className="border border-[#283038] bg-[#1B222B] px-4 py-3">
            <h2 className="text-xl font-light mb-4">Performance Metrics</h2>
            <div className="mb-8">
                <h3 className="text-lg">IOPS</h3>
                <div className="flex flex-col md:flex-row gap-4">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cluster?.metrics?.iops}>
                            <XAxis dataKey="time"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="read" stroke="#8884d8" name="Read"/>
                            <Line type="monotone" dataKey="write" stroke="#82ca9d" name="Write"/>
                        </LineChart>
                    </ResponsiveContainer>
                    <div className='w-40 flex-shrink-0 flex-grow-0 basis-40'>
                        <div className="text-lg text-[#858B90] uppercase mb-1">IOPS</div>
                        <div className="flex flex-col">
                            <div className="border border-[#333B4480] px-3 py-2">
                                <p className='text-base text-[#A6AAAE] font-medium leading-snug'>Read</p>
                                <span className='text-lg font-normal leading-tight text-[#AA7EDD]'>{formatNumber(totalIops?.readTotal)} IOPS</span>
                            </div>
                            <div className="border border-[#333B4480] px-3 py-2 border-t-0">
                                <p className='text-base text-[#A6AAAE] font-medium leading-snug'>Write</p>
                                <span className='text-lg font-normal leading-tight text-[#00A3CA]'>{formatNumber(totalIops?.writeTotal)} IOPS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-light mb-4">Throughput</h2>
                <div className="flex flex-col md:flex-row gap-4">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={cluster?.metrics?.throughput}>
                            <XAxis dataKey="time"/>
                            <YAxis/>
                            <Tooltip/>
                            <Line type="monotone" dataKey="read" stroke="#8884d8" name="Read"/>
                            <Line type="monotone" dataKey="write" stroke="#82ca9d" name="Write"/>
                        </LineChart>
                    </ResponsiveContainer>
                    <div className='w-40 flex-shrink-0 flex-grow-0 basis-40'>
                        <div className="text-lg text-[#858B90] uppercase mb-1">Throughput</div>
                        <div className="flex flex-col">
                            <div className="border border-[#333B4480] px-3 py-2">
                                <p className='text-base text-[#A6AAAE] font-medium leading-snug'>Read</p>
                                <span className='text-lg font-normal leading-tight text-[#AA7EDD]'>{formatMemory(totalThroughput.readTotal)} </span>
                            </div>
                            <div className="border border-[#333B4480] px-3 py-2 border-t-0">
                                <p className='text-base text-[#A6AAAE] font-medium leading-snug'>Write</p>
                                <span className='text-lg font-normal leading-tight text-[#00A3CA]'>{formatMemory(totalThroughput.writeTotal)} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerformanceMetrics;

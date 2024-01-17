import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const PriceUpdatesChart = ({ candlestickData, latestPrice }) => {
    const [series, setSeries] = useState([
        {
            data: candlestickData,
        },
    ]);

    const options = {
        chart: {
            type: 'candlestick',
            foreColor: '#fff'
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
        theme: {
            mode: 'dark'
        }
    };

    useEffect(() => {
        const updatedData = [
            ...candlestickData,
            {
                x: new Date().toLocaleTimeString(),
                y: latestPrice,
            },
        ];

        setSeries([
            {
                data: updatedData,
            },
        ]);
    }, [latestPrice, candlestickData]);

    return (
        <div style={{
            width: '100%'
        }}>
            <ReactApexChart options={options} series={series} type="candlestick" height={350} width="100%" />
        </div>
    );
};

export default PriceUpdatesChart;

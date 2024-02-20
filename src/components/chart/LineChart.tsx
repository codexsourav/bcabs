// LineChart.tsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
  data?: {
    labels: string[]; // Use string instead of number for week names
    datasets: {
      label: string;
      values: number[];
      borderColor: string;
    }[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data = { labels: [], datasets: [] } }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    // Destroy previous chart instance
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (ctx && data) {
      // Create new chart instance
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: data.datasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.values,
            borderColor: dataset.borderColor,
            borderWidth: 2,
            backgroundColor: dataset.borderColor,
            fill: false,
            radius: 5,

          })),
        },
        options: {
          scales: {
            x: {
              type: 'category', // Use category scale for strings (week names)
              labels: data.labels,
              position: 'bottom',
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Cleanup when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartRef, data]);

  return (
    <div className='mt-8 mb-4'>
      <canvas ref={chartRef} className='w-full h-full' />
    </div>
  );
};

export default LineChart;

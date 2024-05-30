import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import useStats from '../hooks/useStats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ startDate, endDate, userId }) => {
  const chartRef = useRef(null);
  const { stats, loading, error } = useStats(startDate, endDate, userId);

  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  const data = {
    labels: stats ? Object.keys(stats.reactionCounts) : [],
    datasets: [
      {
        label: 'Reaction Counts',
        data: stats ? Object.values(stats.reactionCounts) : [],
        fill: false,
        backgroundColor: 'rgba(246, 177, 122, 0.2)',
        borderColor: 'rgba(246, 177, 122, 1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
        type: 'category',
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Reaction Statistics',
        color: '#F6B17A', // Change this to your desired color
      },
      legend: {
        labels: {
          color: '#F6B17A', // Change this to your desired color
        }
      },
      tooltip: {
        titleColor: '#F6B17A', // Change this to your desired color
        bodyColor: '#F6B17A', // Change this to your desired color
        footerColor: '#F6B17A' // Change this to your desired color
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default Chart;

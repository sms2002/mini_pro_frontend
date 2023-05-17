import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
const BarChartAnalysis = ({ labels, data }) => {
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Attempted(%)',
          data: data.attempted,
          backgroundColor: 'rgba(255, 193, 7, 0.5)', // Orange color for bar 1
          borderColor: 'rgba(255, 193, 7, 1)',
          borderWidth: 1,
        },
        {
          label: 'Correct(%)',
          data: data.correct,
          backgroundColor: 'rgba(40, 167, 69, 0.5)', // Green color for bar 2
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 1,
        },
        {
          label: 'Wrong(%)',
          data: data.wrong,
          backgroundColor: 'red', // Red color for bar 3
          borderColor: 'red',
          borderWidth: 1,
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      indexAxis: 'x', // Set indexAxis to 'y' for horizontal bar chart
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            boxWidth: 12,
            usePointStyle: false,
          },
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          position: 'bottom',
        },
        y: {
          position: 'bottom',
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Marks(%)',
            fontSize: 50 // Specify the y-axis label text
          },
        },
      },
    };
  
    return (<Bar data={chartData} options={chartOptions} />);
  };
  
  export default BarChartAnalysis;
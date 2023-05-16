import React, { useEffect, useState } from "react";
import "./BarChart.css";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { baseUrl } from "../../access";
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const BarChart = (props) => {
  const [chartData, setChartData] = useState(null);
  const [LatestArray, setLatestArray] = useState([])
  useEffect(() => {
    const fetchData = () => {
      const userToken = localStorage.getItem('userAccess');
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      axios
        .get(`${baseUrl}/api/technical/latest/response/`, config)
        .then((response) => {
          const data = response.data;
          const scoresArray = data.map((item) => item.results.scores.total_score);
          setLatestArray(scoresArray);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(LatestArray);

    if (LatestArray.length > 0) {
      const xLabels = LatestArray.map((_, index) => `Test ${index + 1}`);

      const data = {
        labels: xLabels,
        datasets: [
          {
            label: ">26",
            data: LatestArray.map((value) => (value > 26 ? value : 0)),
            backgroundColor: "rgba(0, 255, 0, 0.2)", // Green color for '>50'
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: ">13 & <= 26",
            data: LatestArray.map((value) =>
              value > 13 && value <= 26 ? value : 0
            ),
            backgroundColor: "rgba(255, 255, 0, 0.2)", // Yellow color for '>10 and <=50'
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "<=13",
            data: LatestArray.map((value) => (value <= 13 ? value : 0)),
            backgroundColor: "rgba(255, 0, 0, 0.2)", // Red color for '<=10'
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      };

      setChartData(data);
    }
  }, [LatestArray]);
  // const getColor = (value) => {
  //     // Implement your custom logic here to generate colors based on value
  //     // This is just an example, you can replace it with your own logic
  //     if (value <= 10) {
  //       return 'red';
  //     }
  //     else if(value>10&&value<=50)
  //     {
  //       return 'orange';
  //     }
  //     else if(value>50)
  //     {
  //         return '#90EE90';
  //     }
  //   };
  return (
    <div className="BarContainer">
      {chartData && chartData.datasets[0].data.length > 0 ? (
        <Bar
          data={chartData}
          options={{
            scales: {
              x: {
                stacked: true, // Align bars horizontally
              },
              y: {
                max: 40,
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p style={{ textAlign: "center" }}>No previous results are available</p>
      )}
    </div>
  );
};

export default BarChart;

'use client'
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AnalyticsDashboard: React.FC = () => {
  // Bar chart data for rentals over time
  const rentalsData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 
      'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ],
    datasets: [
      {
        label: 'Rentals Over Time',
        data: [10, 20, 30, 25, 40, 50, 60, 55, 70, 80, 65, 90 , 100],
        backgroundColor: '#3B82F6',  // Blue for bars
        borderColor: '#2563EB',  // Darker blue for borders
        borderWidth: 1,
      },
    ],
  };

  // Bar chart data for car availability
  const carAvailabilityData = {
    labels: [
      'Gasoline',
      'Diesel',
      'Sport',
      'Electric',
      'Sedan',
      'SUV',
      'Hatchback',
      'Hybrid',
    ],
    datasets: [
      {
        label: 'Car Availability by Type',
        data: [15, 10, 12, 8, 20, 18, 10, 7],
        backgroundColor: '#3B82F6',  // Blue for bars
        borderColor: '#2563EB',  // Darker blue for borders
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-200 py-12">
      {/* Dashboard Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-blue-800 tracking-wide">
          Analytics Dashboard
        </h1>
        <p className="text-lg text-blue-600 mt-2">
          Gain insights into rental trends and car availability.
        </p>
      </div>

      {/* Chart Section */}
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2  gap-8">
        {/* Rentals Over Time Bar Chart Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-xl font-semibold text-blue-700 text-center mb-4">
            Rentals Over Time
          </h1>
          <div className="h-96">
            <Bar data={rentalsData} />
          </div>
        </div>

        {/* Car Availability Bar Chart Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-xl font-semibold text-blue-700 text-center mb-4">
            Car Availability by Type
          </h1>
          <div className="h-96">
            <Bar data={carAvailabilityData} />
          </div>
        </div>
      </div>

      {/* Closing Paragraph */}
      <div className="text-center mt-12">
        <p className="text-blue-700 text-lg">
        This dashboard provides you with the insights needed to make informed decisions, helping you optimize rental operations and better meet customer needs. By tracking trends over time and evaluating car availability by type, you can uncover growth opportunities, refine fleet management strategies, and improve the overall customer experience. Stay competitive by transforming data into actionable steps.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;

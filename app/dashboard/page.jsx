"use client";

import ChartComponent from '../components/charts'
import TableChartComponent from "../components/list";

const Dashboard = () => {

  return (
    <main>
      <div className="flex flex-col md:flex-row w-full h-screen p-5 space-x-0 md:space-x-5">
        <div className="flex-1">
          <ChartComponent />
        </div>

        <div className="flex-1">
          <TableChartComponent />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

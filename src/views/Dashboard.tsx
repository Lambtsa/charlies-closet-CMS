import React from 'react';
import AccountNavigation from '../components/AccountNavigation';
import ClientsBarChart from '../components/charts/ClientsBarChart';


const Dashboard = () => {
  return (
    <>
      <AccountNavigation>
        <h2>Dashboard</h2>
        <div className="dashboard">
          <ClientsBarChart />
        </div>
      </AccountNavigation>
    </>
  )
};

export default Dashboard;

import React, { useEffect, useState, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import baseApiUrl from '../../helpers/api-service';
import { ValidationContext } from '../../hooks/ValidationContext';
import Loader from '../validation/Loader';

const userData = (leads: any, users: any) => {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '# of clients',
        data: [users.length],
        backgroundColor: ['rgba(75, 192, 192, 0.4)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
      {
        label: '# of leads',
        data: [leads.length],
        backgroundColor: ['rgba(255, 99, 132, 0.4)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };
}

const options = {
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
  plugins: {
    legend: {
        labels: {
            // This more specific font property overrides the global property
            font: {
                family: "'Nunito', 'sans-serif'"
            }
        }
    }
    
  },
};

const ClientsBarChart = () => {
  const [users, setUsers] = useState<any>([]);
  const [leads, setLeads] = useState<any>([]);
  const { setError, setValidationMessage } = useContext(ValidationContext);
  const token = JSON.parse(localStorage.token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseApiUrl}/users`, {
        method: 'GET', 
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        setError(true);
        setValidationMessage('There has been an issue getting users');
      } else {
        const data = await response.json();
        const leadFilter = data.filter((user: any) => !user.onboardingProgress.finished);
        const userFilter = data.filter((user: any) => user.onboardingProgress.finished);
        setLeads(leadFilter);
        setUsers(userFilter);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [])

  return (
    <>
      {!isLoading && (
        <Bar className="barchart graph" type="bar" data={userData(leads, users)} options={options} />
      )}
      {isLoading && <Loader />}
    </>
  )
};

export default ClientsBarChart;
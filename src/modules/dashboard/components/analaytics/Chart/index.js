import React, { Fragment, useLayoutEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from '../../../../../Store/Features/LoaderSlice';
import { GETREQUEST } from '../../../../../config/requests';
import { endpoints } from '../../../../../config/endpoints';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



function Charts() {
  const [gdata, setgdata] = useState({})
  const dispatch = useDispatch()
  useLayoutEffect(() => {
    get()
    return () => {
      setgdata(null)
    };
  }, [])
  const get = async () => {
    try {
      dispatch(showLoader())
      const data = await GETREQUEST(endpoints.Admin_graphdata)
      setgdata(data)
      dispatch(hideLoader())
    }
    catch (e) {
      console.log(e);
      dispatch(hideLoader())
    }
  }
  const data = {
    labels: gdata?.labels || [],
    datasets: gdata?.datasets || [],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `User vs Posts chart`,
      },
    },
  };

  return (
    <Fragment>
      <Line options={options} data={data} />
    </Fragment>
  );
}

export default Charts;
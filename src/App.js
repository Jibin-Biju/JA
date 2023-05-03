import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom'
import GetLoader from './common/GetLoader';
import Loader from './common/Loader';

const User = React.lazy(() => import('./modules/user'))
const Dashboard = React.lazy(() => import('./modules/dashboard'))

function App() {
  return (
    <Fragment>
      <Loader />
      <React.Suspense fallback={<GetLoader />}>
        <Routes>
          <Route index path="/*" element={<User />} />
          <Route path="dashboard/*" element={<Dashboard />} />
        </Routes>
      </React.Suspense>
    </Fragment>
  );
}
export default App
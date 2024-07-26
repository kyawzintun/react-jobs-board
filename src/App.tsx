import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import HomePage from './pages/HomePage.tsx';
import JobsPage from './pages/JobsPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import AddJobPage from './pages/AddJobPage.tsx';
import MainLayout from './layouts/MainLayout.tsx';
import JobPage, { jobLoader } from './pages/JobPage.tsx';
import EditJobPage from './pages/EditJobPage.tsx';
import { Job, NewJob } from './types/index';

const App = () => {
  const addJob = async (job: NewJob) => {
    await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const updateJob = async (job: Job) => {
    await fetch(`/api/jobs/${job.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(job),
    });
    return;
  };

  const deleteJob = async (id: string) => {
    await fetch(`/api/jobs/${id}`, {
      method: 'DELETE',
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;

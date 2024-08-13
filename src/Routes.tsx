import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { addJob, updateJob, deleteJob, jobLoader } from '@/src/api/jobs';
import HomePage from '@/src/pages/HomePage';
import JobsPage from '@/src/pages/JobsPage';
import NotFoundPage from '@/src/pages/NotFoundPage';
import AddJobPage from '@/src/pages/AddJobPage';
import MainLayout from '@/src/layouts/MainLayout';
import JobPage from '@/src/pages/JobPage';
import EditJobPage from '@/src/pages/EditJobPage';

export const createAppRouter = () =>
  createBrowserRouter(
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

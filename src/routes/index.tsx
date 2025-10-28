import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from '@/page/home';
import AppLayout from '@/layout/app-layout';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;

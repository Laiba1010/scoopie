import { Navbar } from '@/components/navbar/navbar';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="w-full relative">
      <Navbar />
      <div className="h-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;

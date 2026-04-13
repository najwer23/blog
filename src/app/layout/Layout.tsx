import { Footer } from 'najwer23morsels/lib/footer';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <Outlet />
      <Footer author="Blog, Mariusz Najwer" initialYear={2026} />
    </>
  );
};

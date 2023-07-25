import { Outlet } from 'react-router-dom';
import s from './app.module.scss';
import { Header } from '../../components/ui/header/header';
import { Navbar } from '../../components/ui/navbar/navbar';

export const App = () => {
  return (
    <div className={s.app}>
      <Header />
      <Navbar />
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
};

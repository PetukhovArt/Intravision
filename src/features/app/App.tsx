import { Outlet } from 'react-router-dom';
import s from './app.module.scss';
import { Header } from '@/components/ui/header/Header.tsx';
import { Navbar } from '@/components/ui/navbar/navbar.tsx';

function App() {
  return (
    <div className={s.app}>
      <Header />
      <Navbar />
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

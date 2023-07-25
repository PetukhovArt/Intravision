import s from './navbar.module.scss';
import { NavLink } from 'react-router-dom';
import knowledge_icon from '@/assets/icons/base_icon.png';
import analytics_icon from '@/assets/icons/analytics_icon.png';
import city_icon from '@/assets/icons/city_icon.png';
import people_icon from '@/assets/icons/people_icon.png';
import logo_icon from '@/assets/icons/logo_icon.png';
import settings_icon from '@/assets/icons/settings_icon.png';
import file_icon from '@/assets/icons/file_icon.png';
import { Typography } from '@/components/ui/typography/typography.tsx';

export const Navbar = () => {
  const setActive = ({ isActive }: { isActive: boolean }) => (isActive ? s.active : s.link);

  return (
    <div className={s.navbar}>
      <div className={s.container}>
        <img src={logo_icon} alt='logo' className={s.logo} />
        {links.map((path, idx) => {
          return (
            <div className={s.item} key={idx}>
              <NavLink className={setActive} to={path.route}>
                <img src={path.icon} alt={path.name} />
                {path.name}
              </NavLink>
            </div>
          );
        })}
      </div>
      <Typography variant={'body2'} className={s.service}>
        IntraService <br />
        5.0.0
      </Typography>
    </div>
  );
};

const links: linksType = [
  {
    name: 'База знаний',
    icon: knowledge_icon,
    route: '/knowledge',
  },
  {
    name: 'Заявки',
    icon: file_icon,
    route: '/tasks',
  },
  {
    name: 'Сотрудники',
    icon: people_icon,
    route: '/employees',
  },
  {
    name: 'Клиенты',
    icon: city_icon,
    route: '/clients',
  },
  {
    name: 'Активы',
    icon: analytics_icon,
    route: '/company-assets',
  },
  {
    name: 'Настройки',
    icon: settings_icon,
    route: '/settings',
  },
];
type linksType = linkType[];
type linkType = {
  name: string;
  icon: string;
  route: string;
};

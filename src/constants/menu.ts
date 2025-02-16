import { MenuItem } from '@/types/constant.type';
import { ROUTE_PATH } from './route';

export const menuItems: MenuItem[] = [
  { icon: '/icons/home.svg', label: 'Home', path: ROUTE_PATH.BORD },
  {
    icon: '/icons/edit.svg',
    label: 'Our Blog',
    path: ROUTE_PATH.OUR_BORD,
    isPivate: true,
  },
];

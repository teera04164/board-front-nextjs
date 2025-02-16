import { useEffect, useState } from 'react';
import { useCheckAuth } from './useCheckAuth';
import { menuItems } from '@/constants/menu';
import { MenuItem } from '@/types/constant.type';

export const useMenusItem = () => {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const { isAuthenticated } = useCheckAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      setMenus(menuItems.filter((item) => !item?.isPivate));
    } else {
      setMenus(menuItems);
    }
  }, [isAuthenticated]);

  return { menus };
};

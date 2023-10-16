import { dashboard, expenses, graph, home, transactions, trend } from './icons';

export const menuItems = [
  {
    id: 1,
    title: 'Home',
    icon: home,
    link: '/dashboard',
  },
  {
    id: 2,
    title: 'Detail',
    icon: graph,
    link: '/dashboard',
  },
  {
    id: 3,
    title: 'Incomes',
    icon: trend,
    link: '/dashboard',
  },
  {
    id: 4,
    title: 'Expenses',
    icon: expenses,
    link: '/dashboard',
  },
];

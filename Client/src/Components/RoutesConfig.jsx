// routesConfig.js
import Competitions from './Competitions/Competitions.jsx';
import Dashboard from './Dashboard/index.jsx';
import Admin from '../Containers/MainLayout/index.jsx'
import Gamefest from './Gamefest/Gamefest.jsx'
import Emails from "./Emails/Emails.jsx";
import Payments from "./Payments/Payments.jsx"
import Interactive from "./Interactive/Interactive.jsx"
import Schedule from "./Schedule/Schedule.jsx"
import ActiveUsers from "./ActiveUsers/ActiveUsers.jsx"
import CustomUrl from "./CustomUrl/CustomUrl.jsx"
import Guestlectures from "./Guestlectures/Guestlectures.jsx"
import Workshop from "./Workshop/Workshop.jsx";
import Sponsors from "./Sponsors/Sponsors.jsx";
import { SponsorYear } from './Sponsors/SponsorYear.jsx';
const routes = [
  {
    path: '/admin-panelktj2024',
    element: <Admin />,
    children: [
      { path: '/admin-panelktj2024', element: <Admin /> },
      { path: '/admin-panelktj2024/dashboard', element: <Dashboard /> },
      { path: '/admin-panelktj2024/games', element: <Gamefest /> },
      { path: '/admin-panelktj2024/competitions', element: <Competitions /> },
      {path: '/admin-panelktj2024/emails' ,element:<Emails/>},
      {path: '/admin-panelktj2024/payments' ,element:<Payments/>},
      {path: '/admin-panelktj2024/interactive' ,element:<Interactive/>},
      {path: '/admin-panelktj2024/schedule' ,element:<Schedule/>},
      {path: '/admin-panelktj2024/customurls' ,element:<CustomUrl/>},
      {path: '/admin-panelktj2024/guestlectures' ,element:<Guestlectures />},
      {path: '/admin-panelktj2024/users' ,element:<ActiveUsers/>},
      {path: '/admin-panelktj2024/sponsors' ,element:<SponsorYear/>},
      {path: '/admin-panelktj2024/workshop' ,element:<Workshop/>},  
      {key:"2020", path:"/admin-panelktj2024/sponsor2020" ,element:<Sponsors year="2020"/>},
      {key:"2022", path:"/admin-panelktj2024/sponsor2022" ,element:<Sponsors year="2022"/>}, 
      {key:"2024", path:"/admin-panelktj2024/sponsor2024" ,element:<Sponsors year="2024"/>}, 
      // Other competition-related routes
    ],
  },
  // Other routes
];

export default routes;

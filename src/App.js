import './App.css';

import ListBooks from './Components/ListBooks';
import Search from './Components/Search';
import { useRoutes } from "react-router-dom";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <ListBooks /> },
    { path: "/search", element: <Search /> },
    // ...
  ]);
  return routes;
};
export default App;

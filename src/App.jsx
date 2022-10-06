
import
{
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

const App = () =>
{
  return (
    <Router>
      <Routes>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <NewPlace />
        </Route>
        <Route path="/" render={ () => <Redirect to="/" /> } />
      </Routes>
    </Router>
  );
};

export default App;
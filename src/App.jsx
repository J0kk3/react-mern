import
{
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from 'react-router-dom';
//components
import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () =>
{
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" exact>
            <Users />
          </Route>
          <Route path="/places/new" exact>
            <NewPlace />
          </Route>
          <Route path="/" render={ () => <Redirect to="/" /> } />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
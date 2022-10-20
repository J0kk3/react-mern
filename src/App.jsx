import
{
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from 'react-router-dom';
//pages
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
//components
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () =>
{
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path="/" exact element={ <Users /> } />
          <Route path="/:userId/places" exact element={ <UserPlaces /> } />
          <Route path="/places/new" exact element={ <NewPlace /> } />
          <Route path="/places/:placeId" exact element={ <UpdatePlace /> } />
          <Route path="/" render={ () => <Redirect to="/" /> } />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
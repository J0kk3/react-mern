import React, { Suspense } from 'react';
import
{
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
//pages
// import Auth from './user/pages/Auth';
// import Users from './user/pages/Users';
// import UserPlaces from './places/pages/UserPlaces';
// import NewPlace from './places/pages/NewPlace';
// import UpdatePlace from './places/pages/UpdatePlace';
//components
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';
import { useAuth } from './shared/hooks/auth-hook';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
//only load the pages when needed
const Users = React.lazy( () => import( './user/pages/Users' ) );
const NewPlace = React.lazy( () => import( './places/pages/NewPlace' ) );
const UserPlaces = React.lazy( () => import( './places/pages/UserPlaces' ) );
const UpdatePlace = React.lazy( () => import( './places/pages/UpdatePlace' ) );
const Auth = React.lazy( () => import( './user/pages/Auth' ) );

const App = () =>
{
  const { token, login, logout, userId } = useAuth();

  let routes;

  if ( token )
  {
    routes = (
      <Routes>
        <Route path="/" element={ <Users /> } />
        <Route path="/:userId/places" element={ <UserPlaces /> } />
        <Route path="/" render={ () => <Navigate to="auth" /> } />
      </Routes>
    );
  }
  else
  {
    routes = (
      <Routes>
        <Route path="/" element={ <Users /> } />
        <Route path="/:userId/places" element={ <UserPlaces /> } />
        <Route path="/places/new" element={ <NewPlace /> } />
        <Route path="/places/:placeId" element={ <UpdatePlace /> } />
        <Route path='/auth' element={ <Auth /> } />
        <Route path="/" render={ () => <Navigate to="/" /> } />
      </Routes>
    );
  }


  return (
    <AuthContext.Provider value={ { isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout } }>
      <Router>
        <MainNavigation />
        <main>
          <Suspense fallback={ <div className="center"><LoadingSpinner /></div> }>
            { routes }
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
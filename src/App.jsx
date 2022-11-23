import
{
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from 'react-router-dom';
//hooks
import { useState, useCallback, useEffect } from 'react';
//pages
import Auth from './user/pages/Auth';
import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
//components
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';

const App = () =>
{
  const [ token, setToken ] = useState( false );
  const [ userId, setUserId ] = useState( false );

  const login = useCallback( ( uid, token, expirationDate ) =>
  {
    setToken( token );
    setUserId( uid );
    const tokenExpirationDate = expirationDate || new Date( new Date().getTime() + 1000 * 60 * 60 );
    localStorage.setItem( 'userData', JSON.stringify( { userId: uid, token: token, expiration: tokenExpirationDate.toISOString() } ) );
  }, [] );

  const logout = useCallback( () =>
  {
    setToken( null );
    setUserId( null );
    localStorage.removeItem( 'userData' );
  }, [] );

  useEffect( () =>
  {
    const storedData = JSON.parse( localStorage.getItem( 'userData' ) );
    // if the left date is greater than the right, it means its' expiration date is still valid
    if ( storedData && storedData.token && new Date( storedData.expiration ) > new Date() )
    {
      login( storedData.userId, storedData.token, new Date( storedData.expiration ) );
    }
  }, [ login ] );

  let routes;

  if ( token )
  {
    routes = (
      <Routes>
        <Route path="/" element={ <Users /> } />
        <Route path="/:userId/places" element={ <UserPlaces /> } />
        <Route path="/" render={ () => <Redirect to="auth" /> } />
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
        <Route path="/" render={ () => <Redirect to="/" /> } />
      </Routes>
    );
  }


  return (
    <AuthContext.Provider value={ { isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout } }>
      <Router>
        <MainNavigation />
        <main>
          { routes }
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
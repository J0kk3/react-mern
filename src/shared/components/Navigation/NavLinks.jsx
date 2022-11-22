import { NavLink } from 'react-router-dom';
//hooks
import { useContext } from 'react';
//components
import { AuthContext } from '../../context/auth-context';
//styles
import './NavLinks.css';

const NavLinks = props =>
{
    //component will re-render whenever the context changes
    const auth = useContext( AuthContext );

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>ALL USERS</NavLink>
            </li>
            <li>
                { auth.isLoggedIn && <NavLink to={ `${ auth.userId }/places` }>MY PLACES</NavLink> }
            </li>
            <li>
                { auth.isLoggedIn && <NavLink to="/places/new">ADD PLACE</NavLink> }
            </li>
            <li>
                { !auth.isLoggedIn && <NavLink to="/auth">AUTHENTICATE</NavLink> }
            </li>
            { auth.isLoggedIn && (
                <li>
                    <button onClick={ auth.logout }>LOGOUT</button>
                </li>
            ) }
        </ul>
    );
};

export default NavLinks;
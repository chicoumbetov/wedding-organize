import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="navigation">
            <NavLink className="navigation__lien" exact to="/" activeClassName="navigation__lien--active">Accueil</NavLink>
            <NavLink className="navigation__lien" exact to="/login" activeClassName="navigation__lien--active">Connexion</NavLink>
        </div>
    );
};

export default Navigation;
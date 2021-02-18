import { useState } from "react";

import { NavLink, Link } from "react-router-dom";

export default function Nav() {

    const [ isActive, setIsActive ] = useState(false);

    const toggleActive = () => {
        setIsActive(!isActive);
    }

    return (
        
        <nav className="navbar bd-navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" />
                </Link>
                <a role="button" className={`navbar-burger ${isActive && 'is-active'}`} aria-label="menu" aria-expanded="false" onClick={toggleActive}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarExampleTransparentExample" className={`navbar-menu ${isActive && 'is-active'}`}>
                <div className="navbar-start">
                    <NavLink className="navbar-item" exact activeClassName="is-active" to="/">
                        Главная
                    </NavLink>
                
                    <NavLink className="navbar-item" exact activeClassName="is-active" to="/category">
                        Категории
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
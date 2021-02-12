import { NavLink, Link } from "react-router-dom";

export default function Nav() {

    return (
        
        <nav className="navbar bd-navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" />
                </Link>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarExampleTransparentExample" className="navbar-menu">
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
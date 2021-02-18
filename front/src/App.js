import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Nav from './components/Nav';
import { BreadcrumbProvider, Breadcrumb, BreadcrumbPortal } from './components/Breadcrumbs';

import Categories from './components/Category';
import CategoryEdit from './CategoryEdit';
import Footer from "./components/Footer";

function App() {
  
  return (
    <>
      <Router>
        <Nav />
        <main className="bd-main" id="main">
        <div className="container bd-container is-max-desktop">

          <BreadcrumbProvider>
            <BreadcrumbPortal />
            <Breadcrumb to="/">Главная</Breadcrumb>
            
            <Switch>
            <Route path="/category/edit/:id">
                <CategoryEdit />
              </Route>
              <Route path="/category">
                <Categories name="Категории" />
              </Route>
              
              <Route exact path="/">
                <Redirect to="/category" />
              </Route>
            </Switch>
          </BreadcrumbProvider>
        </div>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;
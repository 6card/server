import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
  Redirect
} from "react-router-dom";

import Nav from './Nav';
import { BreadcrumbProvider, Breadcrumb, BreadcrumbPortal } from './Breadcrumbs';

import Categories from './Category';
import CategoryEdit from './CategoryEdit';
import Film from './Film';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Nav />
        <main className="bd-main">
        <div className="container is-max-desktop">

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

              <Route path="/film/:id">
                <Film />
              </Route>
              
              <Route exact path="/">
                <Redirect to="/category" />
              </Route>
            </Switch>
          </BreadcrumbProvider>
        </div>
        </main>
      </Router>
    </div>
  );
}

export default App;

function Home() {
  let match = useRouteMatch();
  return <h2>Home{JSON.stringify(match)}</h2>;
}


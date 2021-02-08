import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";


import Category from './Category';
import CategoryEdit from './CategoryEdit';
import Film from './Film';

function App() {
  
  return (
    <div className="App">
        
      <Router>
          <Link to="/">Home</Link>
          <Link to="/category">Category</Link>
          <Link to="/category/tYBkXlI8f">Categories</Link>
        <Switch>
        <Route path="/category/edit/:id">
            <CategoryEdit />
          </Route>
          <Route path="/category">
            <Category />
          </Route>

          <Route path="/film/:id">
            <Film />
          </Route>
          
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
      
      <header className="App-header">

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

function Home() {
  let match = useRouteMatch();
  return <h2>Home{JSON.stringify(match)}</h2>;
}


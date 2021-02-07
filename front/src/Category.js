import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import categoryService from './services/category.service';



export default function Category() {

    let {url, path} = useRouteMatch();

    const cat = {
        name: 'Категории'
    }
    

    return (
        <div>
            <h3>Please select a topic.</h3>
            <Switch>
                <Route path={`${path}(/:id)?`}>
                    <CategoriesList name={cat.name} url={url}/>
                </Route>
            </Switch>
        </div>
    );
}

function CategoriesList(props) {

    let { id } = useParams();
    let match = useRouteMatch();

    const [ categories, setCategories ] = useState(null);
    const [ category, setCategory ] = useState(null);

    useEffect(() => {
        getCategories();
        if (id)
            getCategory();
    }, [id]);

  
    const getCategories = async () => {
        let res = await categoryService.getAllByParentId(id || '');
        setCategories(res);
    }

    const getCategory = async () => {
        let res = await categoryService.getById(id || '');
        setCategory(res);
    }

    if (match.isExact) {
        return (
            <ul className="list">
                {(categories && categories.length > 0) ? (
                    categories.map(cat => <li key={cat.id}><Link to={`${match.url}/${cat.id}`}>{cat.name}</Link> | <Link to={`/category/edit/${cat.id}`}>edit</Link></li>)
                ) : (
                    <p>No categories found</p>
                )}
            </ul>
        );
    }

    return (
        <div>

            {category !== null &&
                <h2><Link to={`${match.url}`}>{props.name || category.name}</Link> ID: {id}, MATCH: {JSON.stringify(match)}</h2>

            }
                

            <Switch>
                <Route path={`${match.url}/:id`}>
                    <CategoriesList cat={props.name} url={match.url}/>
                </Route>
            </Switch>

        </div>
    );
}
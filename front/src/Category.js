import { useState, useEffect } from "react";
import {
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

import { useHttp } from './hooks/http-hook';
import VideoList from './VideoList';
import Film from './Film';

import { Breadcrumb } from './Breadcrumbs';

export default function Categories({name}) {

    let { id } = useParams();
    let match = useRouteMatch();

    const [ category, setCategory ] = useState(null);
    const [ notFound, setNotFound ] = useState(false);

    const { request, error, isLoading, clearError } = useHttp();

    useEffect(() => {
        const abortCtrl = new AbortController();
        //abortCtrl.signal.addEventListener('abort', () => console.log("отмена!"));

        if (id) {
            getCategory({ signal: abortCtrl.signal });
        }
        return () => abortCtrl.abort();
    }, [id]);


    const getCategory = async (opts) => {
        const res = await request(`/api/categories/${id}`, opts);
        if (typeof res === 'undefined' ) {
            setNotFound(true);
        } else {
            setCategory(res);
        }
        
    }

    const renderSwitch = () => {
        return (
            <CategoryRouter category={category} name={name}/>
        );
    }

    const renderFound = () => {
         return (
            <>
                <CategoryList parentId={id} />
                <VideoList categotyId={id} />
            </>
         )
     }

    if (notFound) {
        return ( 
            <h2>Category not found!</h2>
        );
    }

    if (match.isExact) {
        return (
            <div>
                <Breadcrumb to={match.url}>{category ? category.name : name}</Breadcrumb>
                <h1 className={`title ${!category && isLoading && 'animated-background'}` }>{category && category.name}</h1>
                {(name || category) && renderFound()}
            </div>
        );
    }
    

    return renderSwitch();
}

const CategoryList = ({ parentId }) => {
    const { url } = useRouteMatch();
    const { request, error, isLoading, clearError } = useHttp();
    const [ categories, setCategories ] = useState(null);

    useEffect(() => {
        const abortCtrl = new AbortController();

        const getCategories = async (opts) => {
            const res = await request(`/api/categories/parent/${parentId || ''}`, opts);
            setCategories(res);
        }
        getCategories({ signal: abortCtrl.signal });
        return () => abortCtrl.abort();
    }, [parentId]);

    if (categories && categories.length > 0) {
        return (
            <div className="columns is-multiline">{categories.map( cat => <CategoryItem key={cat.id} url={url} cat={cat} />)}</div>
        );
    } else {
        return (
            <></>
        );
    }
    //{ isLoading && <div className="columns is-multiline"><CategoryItem url={url} /></div> }
}

const CategoryItem = ({ url, cat }) => {
    return (
        <div className="column is-one-third">
            <div className="card bd-category">
                <div className="card-image">
                    <figure className="image">
                        {cat 
                        ? <img src="https://i.ytimg.com/vi/S-nHYzK-BVg/maxresdefault.jpg" alt="Placeholder image" /> 
                        :<div className="image-placeholder animated-background"></div>
                        }
                    </figure>
                </div>
                <div className="card-content">
                    <h4 className={`title is-5 ${!cat && 'animated-background'}` }>
                        {cat && <Link to={`${url}/${cat.id}`}>{cat.name}</Link>}
                    </h4>
                </div>
            </div>
            
        </div>
    );
}

const CategoryRouter = ({ category, name }) => {
    const { url } = useRouteMatch();
    return (
        <>
        <Breadcrumb to={url}>{category ? category.name : name}</Breadcrumb>
        
        <Switch>
            <Route path={`${url}/:id([a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+)`}>
                <Film catId={category && category.id} />
            </Route>
            
            <Route path={`${url}/:id`}>
                <Categories cat={name} url={url}/>
            </Route>

        </Switch>
        </>
    );

}
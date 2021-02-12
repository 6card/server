import { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from "react-router-dom";


import videoService from './services/video.service';

export default function VideoList(props) {

    let { id } = useParams();
    let match = useRouteMatch();
    const [ videos, setVideos ] = useState(null);

    useEffect(() => {
        const getVideos = async () => {
            let res = await videoService.getAllCategoryId(id || '');
            setVideos(res);
        }
        getVideos();
    }, [props.categotyId, id]);

    return (
        <ul>

            {videos !== null &&
                videos.map( v => {
                    return <li key={v.id}><Link to={`${match.url}/${v.id}`}>{v.name}</Link></li>
                })
            }

        </ul>
    );

}
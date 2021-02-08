import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import videoService from './services/video.service';

export default function VideoList(props) {

    let { id } = useParams();
    const [ videos, setVideos ] = useState(null);

    useEffect(() => {
        getVideos();
    }, [props.categotyId]);


    const getVideos = async () => {
        let res = await videoService.getAllCategoryId(id || '');
        setVideos(res);
    }


    return (
        <ul>

            {videos !== null &&
                videos.map( v => {
                    return <li><Link to={`/film/${v.id}`}>{v.name}</Link></li>
                })
            }

        </ul>
    );

}
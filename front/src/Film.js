import { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";

import {useHttp} from './hooks/http-hook';

import { Breadcrumb } from './Breadcrumbs';

export default function Film({catId}) {

    let { id } = useParams();
    let match = useRouteMatch();
    const [ video, setVideo ] = useState(null);
    const { request, error, isLoading, clearError } = useHttp();

    useEffect(() => {
        const getVideo = async () => {
            const res = await request(`/api/videos/${catId}/${id}`);
            setVideo(res);
        }
        getVideo();
    }, [id, catId]);

        return (
            <div>
                <Breadcrumb to={match.url}>{video ? video.name : ''}</Breadcrumb>
                <h1 className={`title ${!video && isLoading && 'animated-background'}` }>{video && video.name}</h1>
                {
                video && 
                    <video className="bg-video" controls name="media">
                        <source src={`/files/video/${video.id.charAt(0)}/${video.id}.mp4`} type="video/mp4" />
                    </video>
                }
            </div>
        );

}
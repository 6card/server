import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import videoService from './services/video.service';

export default function Film() {

    let { id } = useParams();
    const [ video, setVideo ] = useState(null);

    useEffect(() => {
        getVideo();
    }, [id]);

    const getVideo = async () => {
        let res = await videoService.getById(id);
        setVideo(res);
    }

    if (video)
        return (
            <div>
                <h1>{video.name}</h1>
                <video controls name="media">
                    <source src={`https://6card.ru/video/${video.id.charAt(0)}/${video.id}.mp4`} type="video/mp4" />
                </video>
            </div>
        );

    return (
        <h1>No video</h1>
    )
}
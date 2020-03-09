import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../../actions';
import { PHOTOS_LOADED } from '../../constants/action-types';
import { Photo } from '../photo';
import './photos.css';

/**
 * Works exactly the same as in Redux
 * function reducer(state, action) {
 *   switch (action.type) {
 *     // and so on
 *   }
 *   console.log(state, action);
 * }
 */

const Photos = ({ id, count = 10 }) => {
    const url = `https://jsonplaceholder.typicode.com/${id ? `albums/${id}/photos` : ''}`;
    const [bigPicture, setBigPicture] = useState();
    const dispatch = useDispatch();
    const photos = useSelector(state => {
        if (state.photos.length > 0) {
            return state.photos.slice(0, count);
        }
        else {
            return [];
        }
    });
    const click = (image) => {
        setBigPicture(image);
    };

    useEffect(() => {
        dispatch(getData(url, PHOTOS_LOADED));
    }, [url, dispatch]);

    return (
        <div className="photos">
            <h2>Photos ({count})</h2>
            <p>Photos will be shown here, the component will use Redux and Hooks</p>
            <div className="photos-list">
                {photos.map(photo => (
                    <figure key={photo.id} className="photo" onClick={() => click(photo)}>
                        <img src={photo.thumbnailUrl} alt={photo.title} loading="lazy" height="150" width="150" />
                        <figcaption>{photo.title}</figcaption>
                    </figure>
                ))}
            </div>
            {bigPicture && <Photo photo={bigPicture} onClick={() => click()} />}
        </div>
    );
};

export default Photos;
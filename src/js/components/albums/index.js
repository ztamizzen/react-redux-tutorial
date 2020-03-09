import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import classNames from 'classnames';

import { getData } from '../../actions';
import { ALBUMS_LOADED, ALBUM_LOADED } from '../../constants/action-types';
import Photos from '../photos';

import './albums.css';

const Albums = ({ count = 10 }) => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const albums = useSelector(state => {
        const len = state.albums.length;
        if (id && Object.keys(state.album).length > 0) {
            console.assert(state.album !== null, 'state.album is null');
            return [state.album];
        } else if (len > 0) {
            console.assert(len === 100, '%i !== %i', 100, len);
            return state.albums.slice(0, count);
        } else {
            return [];
        }
    });

    useEffect(() => {
        let url = `https://jsonplaceholder.typicode.com/albums`;
        if (id) {
            url = url + '/' + id
            dispatch(getData(url, ALBUM_LOADED));
        } else {
            dispatch(getData(url, ALBUMS_LOADED));
        }
        return function cleanup() {
        }
    }, [id, dispatch]);

    const goToAlbum = (id) => {
        history.push(`/albums/${id}`)
    };
    if (albums.length > 0) {
        return (
            <div className="photos">
                <h2>Albums ({count})</h2>
                <p>Albums will be shown here, the component will use Redux and Hooks</p>
                <div className="album-list">
                    {albums && albums.map(album => (
                        <figure key={album.id} id={album.id}
                            className={"album " + (id && parseInt(id) === album.id ? "selected-album" : "")}
                            onClick={() => goToAlbum(album.id)}>
                            <figcaption>{album.title}</figcaption>
                        </figure>
                    ))}
                </div>
                {id && <Photos id={id} />}
            </div>
        );
    } else {
        return null;
    }
};
export default Albums;

export const Sidebar = () => {
    const { id } = useParams();
    const url = `https://jsonplaceholder.typicode.com/albums`;
    const dispatch = useDispatch();
    const albums = useSelector(state => {
        if (state.albums) {
            return state.albums;
        } else {
            return [];
        }
    });
    useEffect(() => {
        dispatch(getData(url, ALBUMS_LOADED));
        return function cleanup() {
        }
    }, [url, dispatch, albums]);
    if (albums.length) {
        return (
            <>
                <h4>Sidebar</h4>
                {albums.map((album) => (
                    <div key={album.id} className={classNames('sidebar-item', { current: parseInt(id) === album.id })}>
                        <Link to={"/albums/" + album.id}>
                            {album.title}
                        </Link>
                    </div>
                ))}
            </>
        );
    } else {
        return null;
    }
};
const styles = {};

styles.fill = {};

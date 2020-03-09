import React from 'react';
import './photo.css';

export const Photo = ({ photo, onClick }) => {
    const dimensions = {
        height: 600,
        importance: 'high',
        loading: 'lazy', // or 'eager'
        width: 600
    };
    return (
        <figure className="big-picture" onClick={onClick}>
            <img
                src={photo.url}
                alt={photo.title}
                loading={dimensions.loading}
                importance={dimensions.importance}
                height={dimensions.height}
                width={dimensions.width} />
            <figcaption>{photo.title}</figcaption>
        </figure>
    );
};
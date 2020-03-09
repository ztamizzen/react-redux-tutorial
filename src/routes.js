import React from 'react';
import App from './js/components/App';
import Photos from './js/components/photos';
import Albums, { Sidebar } from './js/components/albums';
export const routes = [
    {
        path: "/",
        exact: true,
        component: () => <App />,
        sidebar: () => <span>App sidebar!</span>
    },
    {
        path: "/albums/:id",
        component: () => <Albums />,
        sidebar: () => <Sidebar />
    },
    {
        path: "/albums",
        component: () => <Albums />,
        sidebar: () => <span>Albums sidebar</span>
    },
    {
        path: "/photos",
        component: () => <Photos />,
        sidebar: () => <span>Photos sidebar</span>
    }
];
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

const Liste = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:1100/api/posts/')
            .then((res) => setData(res.data));
    }, []);

    return (
        <div className="liste">
            {data.map((post) => (
               <Post post={post} key={post.id}/>
            ))}
        </div>
    );
};

export default Liste;

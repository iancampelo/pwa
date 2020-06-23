import React, { useState, useEffect } from 'react';
import { fetchBlog } from './api/fetchBlog';
import './App.css';

const useStickyState = (defaultValue, key) => {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    return stickyValue !== null
      ? JSON.parse(stickyValue)
      : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

const App = () => {
  const [data, setData] = useState([]);
  const [asc, setAsc] = useStickyState(true, 'sortAsc');

  useEffect(() => {
    fetchBlog()
      .then((dt) => {
        setData(dt);
      })
      .catch((err) => console.log(err));
  }, []);

  const sortList = () => {
    if (asc) {
      data.sort((a, b) => a.title > b.title ? 1 : -1);
      setAsc(false);
    } else {
      data.sort((a, b) => a.title > b.title ? -1 : 1);
      setAsc(true);
    }
  };

  return (
    <div>
      <h1>Ian's Blog</h1>
      <button onClick={sortList}>Sort</button>
      <div className="page-container">
        {data && data.map((item) => {
          return (
            <div key={item.id} className="item-container">
              <h2 className="item-title">{item.title}</h2>
              <p className="item-body">{item.body}</p>
            </div>
          );
          })
        }
      </div>
    </div>
  );
}

export default App;

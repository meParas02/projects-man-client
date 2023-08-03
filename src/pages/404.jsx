import React from 'react';
import './css/NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="content">
        <h1>Oops!</h1>
        <p>It looks like you've stumbled upon a page that doesn't exist.</p>
        <img src="/404-error.png" alt="Error 404" />
        <p>But don't worry, we've got you covered!</p>
        <a href="/">Go back to the homepage</a>
      </div>
    </div>
  );
};

export default NotFound;

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Router';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Suspense fallback={<div>Loading... </div>}>
    <Router />
  </Suspense>
  // </React.StrictMode>
);


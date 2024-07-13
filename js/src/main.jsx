import React from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
// import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
);

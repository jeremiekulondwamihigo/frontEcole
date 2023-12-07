import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import ThemeCustomization from 'themes';

// apex-chart
import 'assets/third-party/apex-chart.css';

// project import

// scroll bar
import 'simplebar/src/simplebar.css';

// third-party

import reportWebVitals from './reportWebVitals';
import App from 'App';
import Context from 'Context';
// ==============================|| MAIN - REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <StrictMode>
    <ThemeCustomization>
      <Context>
        <App />
      </Context>
    </ThemeCustomization>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

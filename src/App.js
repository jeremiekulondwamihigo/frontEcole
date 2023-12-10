// project import
import Routes from 'routes';

import ScrollTop from 'components/ScrollTop';
// apex-chart
import 'assets/third-party/apex-chart.css';

// project import
import { store } from 'store';

import { BrowserRouter } from 'react-router-dom';

import { Provider as ReduxProvider } from 'react-redux';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter basename="/ecole">
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </BrowserRouter>
    </ReduxProvider>
  );
};

export default App;

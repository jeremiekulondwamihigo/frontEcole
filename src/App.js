// project import
import Routes from 'routes';

import ScrollTop from 'components/ScrollTop';
// apex-chart
import 'assets/third-party/apex-chart.css';

// project import

import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import reducers from 'store/reducers';
import { readAllYear } from 'Redux/Annee';
import { readUser } from 'Redux/User';
import { getOption } from 'Redux/Option';
import { Provider as ReduxProvider } from 'react-redux';
import { useContext } from 'react';
import { CreateContexte } from 'Context';

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  const store = configureStore({
    reducer: reducers
  });
  const { user } = useContext(CreateContexte);
  // ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

  const { dispatch } = store;
  dispatch(readAllYear(user?.codeEtablissement));
  dispatch(getOption(user?.codeEtablissement));
  if (localStorage.getItem('token')) {
    dispatch(readUser());
  }

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

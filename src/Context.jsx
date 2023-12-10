/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { config } from 'utils/Liens';
import React, { createContext } from 'react';
import { lien_read } from 'utils/Liens';
import axios from 'axios';
export const CreateContexte = createContext();

const ContexteAll = (props) => {
  const [user, setUser] = React.useState();
  const [showDataClasseSelect, setShowDataClasseSelect] = React.useState('');
  const loadingUser = () => {
    axios
      .get(`${lien_read}/user`, config)
      .then((response) => {
        if (response.data) {
          setUser(response.data);
        }
      })
      .catch(function (err) {
        if (err.code === 'ERR_NETWORK') {
          console.log('Connection not found');
        }
      });
  };

  React.useEffect(() => {
    loadingUser();
  }, []);

  const LogOut = () => {
    localStorage.removeItem('token');
    window.location.replace('/ecole/login');
  };

  return (
    <CreateContexte.Provider
      value={{
        user,
        LogOut,
        showDataClasseSelect,
        setShowDataClasseSelect
      }}
    >
      {props.children}
    </CreateContexte.Provider>
  );
};
export default React.memo(ContexteAll);

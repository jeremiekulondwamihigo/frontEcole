/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { config } from 'utils/Liens';
import React, { createContext } from 'react';
import { lien_read } from 'utils/Liens';
import axios from 'axios';
export const CreateContexte = createContext();

const ContexteAll = (props) => {
  const [user, setUser] = React.useState();
  const loadingUser = async () => {
    try {
      const response = await axios.get(`${lien_read}/user`, config);
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
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
        LogOut
      }}
    >
      {props.children}
    </CreateContexte.Provider>
  );
};
export default React.memo(ContexteAll);

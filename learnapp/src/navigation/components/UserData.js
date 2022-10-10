import React, { useState, useEffect } from 'react';
import { useIsFocused } from "@react-navigation/native";
import * as Store from '../components/auth/Store'
import Api from '../components/auth/Api';

export const DataContext = React.createContext({})

const UserData = () => {
  const [apiResponse, setApiResponse] = useState({});

  //View will appear 
  const isFocused = useIsFocused();
  useEffect(() => {
      if (isFocused) {
        console.log("************")
          setTimeout(async () => {
              var userStoredToken = await Store.getData(Store.userToken)

              //API Call
              var a = await Api(apiName = 'user/me/all', data = { "accessToken": userStoredToken }, method = 'POST');
              a.then((result) => setApiResponse(result))
             
             
          })
      }
  }, [isFocused]);

  return (
    <DataContext.Provider value={apiResponse} />
  );
}

export default UserData
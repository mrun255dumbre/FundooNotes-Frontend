import React, { useContext, useEffect } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { AppContext } from '../utils/AppContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(AppContext);

  return (<Route {...rest} render={(props) => (
    user
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
  )
}

export { ProtectedRoute };
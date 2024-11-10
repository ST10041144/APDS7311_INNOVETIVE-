import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, roles, userRole, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!userRole || !roles.includes(userRole)) {
        // Redirect to a 'Not Authorized' page or login if the user is not authorized
        return <Redirect to="/not-authorized" />;
      }
      return <Component {...props} />;
    }}
  />
);

export default ProtectedRoute;

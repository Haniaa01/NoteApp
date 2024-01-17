import React, { ComponentType, ReactNode, useContext } from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import AuthContext, { AuthContextType } from "../context/AuthContext";
// Define the type for custom props
interface PrivateRouteProps extends RouteProps {
    children?: ReactNode;
    component?: ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, component: Component, ...rest }) => {
    console.log("works");
    const { user } = useContext<AuthContextType>(AuthContext);

    return (
        <Route {...rest} render={props =>
            !user ? <Redirect to="/login" /> : Component ? <Component {...props} /> : children
        } />
    );
};

export default PrivateRoute;

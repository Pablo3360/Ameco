import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component: Component }) => {

    const user = useSelector( state => state.user );
    let auth;
    if( user.token ) auth = true;
    else auth = false;
    
    return auth ? <Component /> : <Navigate to="/" />;
 };

export default PrivateRoute;
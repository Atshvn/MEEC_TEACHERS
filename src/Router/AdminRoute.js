import { useContext } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { store } from '../Store/store';
    
    export  const AdminRoute = ({ component: Component, ...rest }) =>{
        const AdminData = JSON.parse(localStorage.getItem("TeacherInfor"));
        const globalState = useContext(store);
        const { dispatch } = globalState;
        return (
            <Route {...rest} exact render={(props) => (
                (AdminData === null) 
                ?  <Redirect to='/' />
                :<Component {...props} />
            )} />
          )
    }
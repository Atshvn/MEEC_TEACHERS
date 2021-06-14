import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import { ForgotPass, Login , Page404, Signup, LoginAdmin} from '../Component/System';
import { HomeAdmin, ListStudent, Mail, ManageResult, Question, Schedule, TestManager, WelCome } from '../Component/Admin';
import { CourseManage } from '../Component/Admin/CourseManage';
import ScrollToTop from '../Commom/ScrollToTop';
import { AdminRoute } from './AdminRoute';
export const Routers = () => {
   
    return (
        <BrowserRouter>
        {/* <Route path="/" component={TopMenuClient} /> */}
        <ScrollToTop/>
        <Switch>
            <Route exact path="/" component={LoginAdmin}/>
            <AdminRoute  path="/main" component={HomeAdmin} />
            <AdminRoute  path="/question" component={Question} />
            <AdminRoute  path="/test" component={TestManager} />
            <AdminRoute  path="/course" component={CourseManage} />
            <AdminRoute  path="/welcome" component={WelCome} />
            <AdminRoute  path="/result" component={ManageResult} />
            <AdminRoute  path="/mail" component={Mail} />
            <AdminRoute  path="/schedule" component={Schedule} />
            <AdminRoute  path="/mystudent" component={ListStudent} />
            <Route  component={Page404}/>
        </Switch>
        {/* <Route path="/" component={Foodter}/> */}
    </BrowserRouter>
    )
}
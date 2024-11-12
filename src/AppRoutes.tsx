import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from "./layout/layout";
import HomePage from './pages/HomePage';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './pages/Dashboard';
import CreateApplication from './components/Applications/CreateApplication';
import ApplicationDetails from './components/Applications/ApplicationDetails';
import UserDetails from './components/Users/UserDetails';
const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element={<Layout ><HomePage /> </Layout>}/>
            <Route path="dashboard" element={ <Layout ><Dashboard /></Layout>}/>
            <Route path="login" element={<Layout ><Login /></Layout>}/>
            <Route path="signup" element={<Layout ><Signup /></Layout>}/>
            <Route path="application/create" element={<Layout ><CreateApplication /></Layout>}/>
            <Route path="application/:id" element={<Layout ><ApplicationDetails /></Layout>}/>
            <Route path="user/:id" element={<Layout ><UserDetails /></Layout>} />
            <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
    )
}
export default AppRoutes;
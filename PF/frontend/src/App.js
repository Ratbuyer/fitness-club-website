import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom';

import MainNavigation from './components/Navigation/MainNavigation';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import Album from './components/Studios/Album';
import Details from './components/Studios/Details';
import Profile from './components/Account/Profile';
import Logout from './components/Account/Logout';


const MainPage = () => {
  return <h2>Main Page</h2>
};


function App() {

  let routes = ( <Routes>
        <Route path="/" element={<MainPage />} exact="true"></Route>
        <Route path="/studios" element={<Album />}></Route>
        <Route path="/studios/:studioId/details" element={<Details />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>)


  return (<BrowserRouter>
    <MainNavigation />
     <main>
  
      {routes}

    </main>
  </BrowserRouter>
  )  

}

export default App;
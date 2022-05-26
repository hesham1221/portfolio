import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import UploadWork from "./pages/UploadWork";
import Work from "./pages/Work";

function App() {
  const [isAdmin,setIsAdmin] = useState(false)
  useEffect(()=>{
    if(!!localStorage.getItem('HPortofolio-admin')){
      setIsAdmin(true)
    }
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setIsAdmin={setIsAdmin} isAdmin={isAdmin} />} />
          <Route path='/work' element={<Work setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>} />
          <Route path='/contact' element={<Contact setIsAdmin={setIsAdmin} isAdmin={isAdmin}/>} />
          <Route path='/hadmin' element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin} />} />
          {isAdmin &&<Route path='/uploadwork' element={<UploadWork isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

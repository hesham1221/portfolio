import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Work from "./pages/Work";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/work' element={<Work />} />
          <Route path='contact' element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

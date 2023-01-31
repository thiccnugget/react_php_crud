import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CustNavbar from './components/CustNavbar';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import ListUser from './components/ListUser';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <CustNavbar />
        <Routes>
          <Route index element={<ListUser />} />
          <Route path="user/create" element={<CreateUser />} />
          <Route path="user/:id/edit" element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

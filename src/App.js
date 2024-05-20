import { Provider } from 'react-redux';
import { store } from './Pages/Reducer';
import { ConnectedForm } from './Pages/RegisterForm';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
import { TablePage } from './Pages/TablePage';
import { EditPage } from './Pages/EditPage';
import { Navbar } from './Pages/NavBar';
function App() {
  return (
    <BrowserRouter>
       <Provider store={store}>
         <Navbar/>
         <Routes>
          <Route path='/' element={<Navigate to='/create-vehicle-details' />} />
          <Route path='/create-vehicle-details' element={<ConnectedForm />} />   
          <Route path='/all-vehicle-details' element={<TablePage/>}/>
          <Route path='/edit-vehicle-details?/:id' element={<EditPage/>}/>
         </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

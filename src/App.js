import { Provider } from 'react-redux';
import { store } from './Pages/Reducer';
import { ConnectedForm } from './Pages/RegisterForm';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { TablePage } from './Pages/TablePage';
import { EditPage } from './Pages/EditPage';
function App() {
  return (
    <BrowserRouter>
       <Provider store={store}>

         <Routes>
          <Route path='/' element={<ConnectedForm/>}/>
          <Route path='/table' element={<TablePage/>}/>
          <Route path='/editPage/:id' element={<EditPage/>}/>
         </Routes>

      </Provider>
    </BrowserRouter>
  );
}

export default App;

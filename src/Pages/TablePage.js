import { useEffect,useState } from 'react';
import '../PageStyles/TablePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setInitialData, VehicleDelete } from './Action';
import Spinner from './Spinner';
import { Navbar } from './NavBar';



export function TablePage(){

    const vehicleDetails = useSelector(state => state.vehicleDetails);
    const [deletingId, setDeletingId] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch(); 
    const [isActive, setIsActive] = useState(false);

    useEffect( ()=> {

            axios.get("https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration")
            .then( response =>{
             
                dispatch(setInitialData(response.data));
                setLoading(false);
            })
    
            .catch( error => {
                  console.error(error);
                  setLoading(false);
            }
            )

        },[dispatch]
    );

   const handleEdit = (id) => {
      setLoading(true);
      
      setTimeout( () => {
        navigate(`/editPage/${id}`);
        setLoading(false);
      },1000);
   };
   const handleDelete = (id) => {
    setIsActive(!isActive);

    setDeletingId(id);
    const dialog = document.getElementById('deleteDialog');
    dialog.showModal();
  };

  const handleConfirmDelete = () => {
    setLoading(true);
    const dialog = document.getElementById('deleteDialog');
    dialog.close();
    setIsActive(!isActive);
    axios.delete(`https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration/${deletingId}`)
      .then(() => {
        dispatch(VehicleDelete(vehicleDetails.findIndex(item => item.id === deletingId)));
        setLoading(false);
        setDeletingId(null);
      })
      .catch(error => {
        console.error("Failed to delete vehicle:", error);
        setLoading(false);
        setDeletingId(null);
      });
  };
 


    
   console.log(isActive);

 
    return(
        <>

        {loading && <Spinner />}
        <Navbar/>
     
        <section className="table-container">
            <h1 className='table-head'>Vehicel Details Table</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>OwnerName</th>
                        <th>Address</th>
                        <th>Ph.No</th>
                        <th>Mk.Name</th>
                        <th>Mo.Name</th>
                        <th>Color</th>
                        <th>Year</th>
                        <th>Ch.Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        vehicleDetails.map( (value,index) => {
                            return(
                                <tr key={index}>
                                    <td>
                                        {value.ownerName}
                                    </td>
                                    <td>
                                        {value.ownerAddress.street},
                                        {
                                            value.ownerAddress.city
                                        },
                                        {
                                            value.ownerAddress.ownerState
                                        }-
                                        {
                                            value.ownerAddress.country
                                        }.
                                    </td>
                                    <td>
                                        {
                                            value.phoneNumber
                                        }
                                    </td>
                                    <td>
                                        {
                                            value.makerName
                                        }
                                    </td>
                                    <td>
                                        {
                                            value.modelName
                                        }
                                    </td>
                                    <td>
                                        {
                                            value.colour
                                        }
                                    </td>
                                    <td>
                                        {
                                            value.year
                                        }
                                    </td>
                                    <td>
                                        {
                                            value.chassisNumber
                                        }
                                    </td>
                                    <td>
                                        <button
                                       className='actionBtn edit'
                                        onClick={ () => handleEdit(value.id)}><i class='bx bx-edit'></i> Edit</button> {  }
                                        <button 
                                        className='actionBtn delete'
                                        onClick={ () => handleDelete(value.id,index)
                                        }> <i class='bx bxs-trash'></i>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                                      
                </tbody>
            </table>
            <button  className='backBtn' onClick={() => navigate('/')}>Back</button>
        </section>
        <dialog id="deleteDialog"  className={ isActive ? ' visible' : 'invisible'}>
        <div className='headMsgCon'><sapn>Confirmation Notification</sapn> <span className='x'
         onClick={() => document.getElementById('deleteDialog').close()}>&times;</span></div>
          <p>Are you sure you want to delete this item?  </p> 
          <div className='div'>
          <span className='no' onClick={() => document.getElementById('deleteDialog').close()}>No</span>
          <span className='yes' onClick={handleConfirmDelete}>Yes</span>
          </div>
        </dialog>
        </>
    );
};
import { useEffect,useState } from 'react';
import '../PageStyles/TablePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { setInitialData, VehicleDelete } from './Action';
import Spinner from './Spinner';



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
        // navigate(`/editPage/${id}`);
        navigate(`/edit-vehicle-details/${id}`);
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
     
        <section className="table-container">
            <div className='headContainer'>
                 <h1 className='table-head'>Vehicel Details</h1>
                 <button  className='backBtn' onClick={() => navigate('/')}><i className='bx bx-plus-circle ' ></i> {  }Add Vehicle</button>
            </div>
           
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
                                <tr key={index} >
                                    <td className= { index % 2 === 0 ? 'name_table':'colored name_table'}>
                                        {value.ownerName}
                                    </td>
                                    <td className= { index % 2 === 0 ? '':'colored'}>
                                        {value.ownerAddress.street}.
                                        {/* {
                                            value.ownerAddress.city
                                        },
                                        
                                        {
                                            value.ownerAddress.ownerState
                                        }-<br/>
                                        {
                                            value.ownerAddress.country
                                        }. */}
                                    </td>
                                    <td className= { index % 2 === 0 ? '':'colored'}>
                                        {
                                            value.phoneNumber
                                        }
                                    </td>
                                    <td className= { index % 2 === 0 ? '':'colored'}>
                                        {
                                            value.makerName
                                        }
                                    </td>
                                    <td className= { index % 2 === 0 ? '':'colored'}>
                                        {
                                            value.modelName
                                        }
                                    </td>
                                    <td className= { index % 2 === 0 ? '':'colored'}>
                                        {
                                            value.colour
                                        }
                                    </td>
                                    <td className= { index % 2 === 0 ? '':'colored'}>
                                        {
                                            value.year
                                        }
                                    </td>
                                    <td className= { index % 2 === 0 ? '':'colored'}>
                                        {
                                            value.chassisNumber
                                        }
                                    </td>
                                    <td className= { index % 2 === 0 ? '':'colored'}>
                                        <button
                                       className='actionBtn edit'
                                        onClick={ () => handleEdit(value.id)}><i class='bx bx-edit'></i> </button> {  }
                                        <button 
                                        className='actionBtn delete'
                                        onClick={ () => handleDelete(value.id,index)
                                        }> <i class='bx bxs-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                                      
                </tbody>
            </table>
            
        </section>

        <dialog id="deleteDialog"  className={ isActive ? ' visible' : 'invisible'}>
        <div className='headMsgCon'><sapn className='headmsgconfirm' >Confirmation Notification</sapn> <span className='x'
         onClick={() => document.getElementById('deleteDialog').close()}>&times;</span></div>
          <p id='msg-content'>Are you sure you want to delete this item?  </p> 
          <div className='div'>
          <span className='no' onClick={() => {document.getElementById('deleteDialog').close()
            setIsActive(!isActive)
          }}>No</span>
          <span className='yes' onClick={handleConfirmDelete}>Yes</span>
          </div>
        </dialog>
        </>
    );
};
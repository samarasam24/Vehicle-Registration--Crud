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
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

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
 


    const handleDelete = (id,index) => {

      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      setLoading(true);
      if (confirmDelete){
        axios.delete(`https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration/${id}`)
        .then(() => {
            dispatch( VehicleDelete(index));
            setTimeout( () => {
                setLoading(false);
            },1000)
        })
        .catch(error => {
            console.error("Failed to delete vehicle:", error);
            setLoading(false);
        });
     };
    };
   

 
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
        </>
    );
};
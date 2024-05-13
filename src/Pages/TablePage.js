import { useEffect, useState } from 'react';
import '../PageStyles/TablePage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { VehicleDelete } from './Action';
export function TablePage(){

    const [ data,setData] = useState([]);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect( ()=> {

            axios.get("https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration")
            .then( response =>{

               
                setData(response.data)
      
            })
    
            .catch( error => {
                  console.error(error);
            }
            )

        },[]
    );


    const vehicles = data.map( (valu) =>  {
        console.log(valu.vehicleDetails);
    });

console.log(vehicles);
 
    return(
        <>
        <section className="table-container">
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

                    {/* {
                        data.map( (value,index) => {
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
                                        },
                                        {
                                            value.ownerAddress.country
                                        }
                                      
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
                                        <button>Edit</button> {  }
                                        <button 
                                        onClick={ (index) => dispatch( VehicleDelete(index))
                                        }>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    } */}
                                      
                </tbody>
            </table>
            <button onClick={() => navigate('/')}>Back</button>
        </section>
        </>
    );
};
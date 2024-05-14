import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateVehicle } from './Action';
import { useState,useEffect } from 'react';
import '../PageStyles/EditPage.css';
import { Navbar } from './NavBar';
export function EditPage() {

    const { id } = useParams(); 
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [vehicle, setVehicle] = useState({
        ownerName: '',
        ownerAddress: {
            street: '',
            ownerState: '',
            city: '',
            country: ''
        },
        phoneNumber: '',
        modelName: '',
        makerName: '',
        colour: '',
        year: '',
        chassisNumber: ''
    });

    useEffect(() => { 
        axios.get(`https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration/${id}`)
            .then(response => {
                setVehicle(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch vehicle details:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVehicle(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setVehicle(prevState => ({
            ...prevState,
            ownerAddress: {
                ...prevState.ownerAddress,
                [name]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration/${id}`, vehicle)
            .then(() => {
                dispatch(updateVehicle(vehicle));  
                navigate('/table');  
            })
            .catch(error => {
                console.error('Failed to update vehicle:', error);
            });
    };


  
    
    return(
        <>
        <Navbar/>
        <section className='editForm-container'>

            <h1 className='editPageHead'>Edit Vehicle Details</h1>

            <form className='editForm' onSubmit={handleSubmit}>

                <div className='flex'>
                <label>Name:</label>
                <input
                type="text" 
                name="ownerName" 
                value={vehicle.ownerName} 
                onChange={handleChange}  
                />
                </div>
                <div className='flex'>
                <label>Phone Number:</label>
                <input 
                placeholder="Phone Number"
                type="text" 
                name="phoneNumber" 
                value={vehicle.phoneNumber} 
                onChange={handleChange}
                 />
                </div>
                <div className='flex'>
                <label>Maker's Name :</label>
                <input 
                placeholder=""
                type="text" 
                name="makerName" 
                value={vehicle.makerName} 
                onChange={handleChange}
                 />
                </div>
                <div className='flex'>
                <label>Model of Name:</label>
                <input 
                placeholder=''
                type="text" 
                name="modelName" 
                value={vehicle.modelName} 
                onChange={handleChange}
                 />
                </div>
                <div className='flex'>
                <label>Colour</label>
                <input 
                placeholder=''
                type="text" 
                name="colour" 
                value={vehicle.colour} 
                onChange={handleChange}
                 />
                </div>
                <div className='flex'>
                <label>Year</label>
                <input
                placeholder=''
                type="text" 
                name="year" 
                value={vehicle.year} 
                onChange={handleChange}
                />
                </div>
                <div className='flex'>
                <label>Chassis Number:</label>
                <input 
                placeholder="" 
                type="text" 
                name="chassisNumber" 
                value={vehicle.chassisNumber} 
                onChange={handleChange}
                 />
                </div>            
                 
                <div>
                <label>Address:</label>
                <div className='address-field'>

                   <input 
                   placeholder="street" 
                   type="text" 
                   name="street" 
                   value={vehicle.ownerAddress.street} 
                   onChange={handleAddressChange} 
                    />

                   <input 
                   placeholder="city"
                   type="text" 
                   name="city" 
                   value={vehicle.ownerAddress.city} 
                   onChange={handleAddressChange}
                   />
                   <input 
                   placeholder="state"
                   type="text" 
                   name="ownerState" 
                   value={vehicle.ownerAddress.ownerState} 
                   onChange={handleAddressChange} 
                    />
                   <input 
                   placeholder="country" 
                   type="text" 
                   name="country" 
                   value={vehicle.ownerAddress.country} 
                   onChange={handleAddressChange}
                    />
                </div>
                </div>

                <button className='updateBtn'>
                    Update
                </button>

            </form>

        </section>
        </>
    );
};
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateVehicle } from './Action';
import { useState,useEffect } from 'react';
import '../PageStyles/EditPage.css';
import { Navbar } from './NavBar';
import { regexNumber,regexDate } from '../RegExp/RegExp';
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

    const [ errorMsg,setErrorMsg ] = useState({});

    const numberCheck = regexNumber.test(vehicle.phoneNumber);
    const yearCheck = regexDate.test(vehicle.year);

    const validateForm = () => {
        const errors = {};
        if (!vehicle.ownerName) errors.nameError = "Name is required!";
        if (!numberCheck) errors.phError = "Phone Number Should be 10 Digits!";
        if (!vehicle.makerName) errors.makeError = "Make Name is required!";
        if (!vehicle.modelName) errors.moError = "Model Name is required!";
        if (!vehicle.colour) errors.colorError = "Color is required!";
        if (!yearCheck) errors.yearError = "Year is required!";
        if (!vehicle.chassisNumber) errors.chassError = "Chassis Number is required!";
        if (!vehicle.ownerAddress.street) errors.streetError = "Street is required!";
        if (!vehicle.ownerAddress.city) errors.cityError = "City is required!";
        if (!vehicle.ownerAddress.ownerState) errors.ownerStateError = "State is required!";
        if (!vehicle.ownerAddress.country) errors.countryError = "Country is required!";
        return errors;
      };
 

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
        const errors = validateForm();
        setErrorMsg(errors);
        if (Object.keys(errors).length === 0) { 
            axios.put(`https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration/${id}`, vehicle)
            .then(() => {
                dispatch(updateVehicle(vehicle));  
                navigate('/table');  
            })
            .catch(error => {
                console.error('Failed to update vehicle:', error);
            });
        };        

       
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
                 { errorMsg.nameError  && <span>{errorMsg.nameError}</span>}
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
                 { errorMsg.phError  && <span>{errorMsg.phError}</span>}
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
                 { errorMsg.makeError  && <span>{errorMsg.makeError}</span>}
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
                 { errorMsg.moError  && <span>{errorMsg.moError}</span>}
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
                 { errorMsg.colorError  && <span>{errorMsg.colorError}</span>}
                </div>
                <div className='flex'>
                <label>Year</label>
                <input
                list='years'
                placeholder=''
                type="text" 
                name="year" 
                value={vehicle.year} 
                onChange={handleChange}
                
                />
                 <datalist id="years"  >
                        <option value="2010"></option>
                        <option value="2011"></option>
                        <option value="2012"></option>
                        <option value="2013"></option>
                        <option value="2014"></option>
                        <option value="2015"></option>
                        <option value="2016"></option>
                        <option value="2017"></option>
                        <option value="2018"></option>
                        <option value="2019"></option>
                        <option value="2020"></option>
                    </datalist>
                { errorMsg.yearError  && <span>{errorMsg.yearError}</span>}
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
                 { errorMsg.chassError  && <span>{errorMsg.chassError}</span>}
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
                    {  errorMsg.streetError && <span>{ errorMsg.streetError}</span>}
                   <input 
                   placeholder="city"
                   type="text" 
                   name="city" 
                   value={vehicle.ownerAddress.city} 
                   onChange={handleAddressChange}
                   />
                    { errorMsg.cityError  && <span>{errorMsg.cityError}</span>}
                   <input 
                   placeholder="state"
                   type="text" 
                   name="ownerState" 
                   value={vehicle.ownerAddress.ownerState} 
                   onChange={handleAddressChange} 
                    />
                    { errorMsg.ownerStateError  && <span>{errorMsg.ownerStateError}
                    </span>}
                   <input 
                   placeholder="country" 
                   type="text" 
                   name="country" 
                   value={vehicle.ownerAddress.country} 
                   onChange={handleAddressChange}
                    />
                     { errorMsg.countryError  && <span>{errorMsg.countryError}</span>}
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
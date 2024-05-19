import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {  updateVehicle } from './Action';
import { useState,useEffect } from 'react';
import '../PageStyles/EditPage.css';
import { regexNumber,regexDate,regexCaps, regexSapce, regexNumOnly } from '../RegExp/RegExp';
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
        if (!vehicle.ownerName) errors.nameError = "Name is required*";
        if (!regexCaps.test(vehicle.ownerName)) errors.nameError = "Name must be alphabetic characters*";

        if (!vehicle.phoneNumber) errors.phError = "Phone number is required*";
        if (!numberCheck) errors.phError = "Phone number should be 10 sigits*"; 

        if (!vehicle.makerName) errors.makeError = "Make same is required*";
        if (!regexCaps.test(vehicle.makerName)) errors.makeError = "Maker name must be alphabetic characters*";

        if (!vehicle.modelName) errors.moError = "Model same is required*";
        if (!regexCaps.test(vehicle.modelName)) errors.moError = "Model name must be alphabetic characters*";

        if (!vehicle.colour) errors.colorError = "Color is required*";
        if (!regexCaps.test(vehicle.colour)) errors.colorError = "Color must be alphabetic characters*"; 

        if (!yearCheck) errors.yearError = "Year is required*";

        if (!vehicle.chassisNumber) errors.chassError = "Chassis number is required*";
        if (!regexNumOnly.test(vehicle.chassisNumber)) errors.chassError = "Chassis number should be number*";

        if (!vehicle.ownerAddress.street) errors.streetError = "Address is required*";
        if(!regexSapce.test(vehicle.ownerAddress.street)) errors.streetError = 'Address must have characters*';
        // if (!vehicle.ownerAddress.city) errors.cityError = "City is required!";
        // if (!vehicle.ownerAddress.ownerState) errors.ownerStateError = "State is required!";
        // if (!vehicle.ownerAddress.country) errors.countryError = "Country is required!";
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
        console.log(name);
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
        console.log("hi");
        if (Object.keys(errors).length === 0) { 
            axios.put(`https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration/${id}`, vehicle)
            .then(() => {
                dispatch(updateVehicle(vehicle));  
                navigate('/vehicle-details');  
            })
            .catch(error => {
                console.error('Failed to update vehicle:', error);
            });
        };        

       
    };

    const formReset = (e) => {
        
        e.preventDefault();

        setVehicle(
            {
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
            }
        );

    };
 


  
    
    return(
        <>
        <section className='editForm-container'>

           

            <form className='editForm' onSubmit={handleSubmit}>
            <h1 className='editPageHead'>Edit Vehicle Details</h1>
                <div className='flex'>
                <label>Name<span id='starStyle'>*</span></label>
                <input
                placeholder="Enter your name"
                type="text" 
                name="ownerName" 
                value={vehicle.ownerName} 
                onChange={handleChange}  
                />
                 { errorMsg.nameError  && <span>{errorMsg.nameError}</span>}
                </div>
                <div className='flex'>
                <label>Phone Number<span id='starStyle'>*</span></label>
                <input 
                placeholder="Phone number"
                type="text" 
                name="phoneNumber" 
                value={vehicle.phoneNumber} 
                onChange={handleChange}
                 />
                 { errorMsg.phError  && <span>{errorMsg.phError}</span>}
                </div>
                <div className='flex'>
                <label>Maker's Name <span id='starStyle'>*</span></label>
                <input 
                placeholder="Enter Vehicle Maker's Name"
                type="text" 
                name="makerName" 
                value={vehicle.makerName} 
                onChange={handleChange}
                 />
                 { errorMsg.makeError  && <span>{errorMsg.makeError}</span>}
                </div>
                <div className='flex'>
                <label>Model of Name<span id='starStyle'>*</span></label>
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
                <label>Colour<span id='starStyle'>*</span></label>
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
                <label>Year<span id='starStyle'>*</span></label>
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
                <label>Chassis Number<span id='starStyle'>*</span></label>
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
                <label>Address <span id='starStyle'>*</span></label>
                <div className='address-field'>

                  <div>
                  <textarea
                   className='address-textarear' 
                   placeholder="Enter your Address..."
                   rows={5}
                   cols={45 } 
                   type="text" 
                   name="street" 
                   value={vehicle.ownerAddress.street} 
                   onChange={handleAddressChange} 
                    />
                    <br/>
                    {  errorMsg.streetError && <span>{ errorMsg.streetError}</span>}
                    </div>

                    
                   {/* <input 
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
                     { errorMsg.countryError  && <span>{errorMsg.countryError}</span>} */}
                </div>
                </div>

                
                <div className='btn-container-form'>
                    <button className='resetbtn' onClick={ (e) => formReset(e)
                    }>
                        Reset
                    </button>
                    <button className='updateBtn'
                    onClick={ (e) => handleSubmit(e)}>
                        Update
                    </button>
                </div>
            </form>

        </section>
        </>
    );
};
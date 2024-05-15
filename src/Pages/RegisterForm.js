import { connect } from 'react-redux';
import '../PageStyles/RegForm.css';
import { MakeName, OwnerCity, OwnerCountry, OwnerName, OwnerState, OwnerStreet, PhoneNum,MakeModel,Year,Color,ChassisNumber, HandleSubmit } from './Action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './NavBar';
import { useState } from 'react';
import { regexDate, regexNumber } from '../RegExp/RegExp';




const stateValue = (state) =>{
 
   return { Data:state}

};




function RegForm({Data}){
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ errorMsg,setErrorMsg ] = useState({});

    const numberCheck = regexNumber.test(Data.phoneNumber);
    const yearCheck = regexDate.test(Data.year);
    
    const validateForm = () => {
        const errors = {};
        if (!Data.ownerName) errors.nameError = "Name is required!";
        if (!numberCheck) errors.phError = "Phone Number Should be 10 Digits!";
        if (!Data.makerName) errors.makeError = "Make Name is required!";
        if (!Data.modelName) errors.moError = "Model Name is required!";
        if (!Data.colour) errors.colorError = "Color is required!";
        if (!yearCheck) errors.yearError = "Year is required!";
        if (!Data.chassisNumber) errors.chassError = "Chassis Number is required!";
        if (!Data.ownerAddress.street) errors.streetError = "Street is required!";
        if (!Data.ownerAddress.city) errors.cityError = "City is required!";
        if (!Data.ownerAddress.ownerState) errors.ownerStateError = "State is required!";
        if (!Data.ownerAddress.country) errors.countryError = "Country is required!";
        return errors;
      };
 
    const FormHandleSubmit = (e) => {

        e.preventDefault();
       
        const errors = validateForm();
        setErrorMsg(errors);
        
        if (Object.keys(errors).length === 0) { 
            navigate('/table'); 
            dispatch( HandleSubmit(e) );
        };        

    };
    
 
    return(
        <>
        <Navbar/>
        <section className='form-container'>

            <h1 className='formHead'> Register Form</h1>

            <form className='form'>

              <div className='flex'>
                <label>Name:</label>
                <input 
                placeholder='Enter Your Name...'
                onChange={(e) => dispatch( OwnerName(e) )}
                value={Data.ownerName}
                />
                { errorMsg.nameError  && <span>{errorMsg.nameError}</span>}
                
              </div>
            <div className='flex'>
                
            <label>Phone Number:</label>
                <input 
                placeholder="Enter Your Phone.No..."
                value={Data.phoneNumber}
                onChange={ (e) => dispatch( PhoneNum(e) ) }/>
                { errorMsg.phError  && <span>{errorMsg.phError}</span>}
            </div>

                <div className='flex'>
                <label>Maker's Name :</label>
                <input 
                placeholder="Enter Vehicle Maker's Name..."
                value={Data.makerName}
                onChange={ (e) => dispatch( MakeName(e) ) }/>
                { errorMsg.makeError  && <span>{errorMsg.makeError}</span>}
                </div>

                <div className='flex'>
                <label>Model of Name:</label>
                <input 
                placeholder='vehicle Model Name...'
                value={Data.modelName}
                onChange={ (e) => dispatch( MakeModel(e) ) }/>
                { errorMsg.moError  && <span>{errorMsg.moError}</span>}
                </div>

                <div className='flex'>
                <label>Color</label>
                <input 
                placeholder='Enter Your Vehicle Color...'
                value={Data.colour}
                onChange={ (e) => dispatch( Color (e) ) }/>
                { errorMsg.colorError  && <span>{errorMsg.colorError}</span>}
                </div>

                <div className='flex'>
                <label>Year</label>
                <input
                list='years' 
                placeholder='Enter Vehicle Mfg.Year..'
                value={Data.year}
                onChange={ (e) => dispatch(
                    Year(e) ) }/>
                    <datalist id="years"   >
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
                placeholder="Enter Vehicle Chassis.NO..." 
                value={Data.chassisNumber}
                onChange={ (e) => dispatch( ChassisNumber(e) ) }/>
                { errorMsg.chassError  && <span>{errorMsg.chassError}</span>}
                </div>

                <div >
            <label>Address:</label>
                <div className='address-field'>

                   <div>
                   <input 
                   placeholder="street" 
                   value={Data.ownerAddress.street}
                   onChange={ (e) => dispatch( OwnerStreet(e) ) }/>
                   <br/>
                   {  errorMsg.streetError && <span>{ errorMsg.streetError}</span>}
                   </div>
  
                  <div>
                  <input 
                   placeholder="city" 
                   value={Data.ownerAddress.city}
                   onChange={ (e) => dispatch( OwnerCity(e) ) }/>
                   <br/>
                   { errorMsg.cityError  && <span>{errorMsg.cityError}</span>}

                  </div>

                  <div>
                  <input 
                   placeholder="state" 
                   value={
                    Data.ownerAddress.ownerState}
                   onChange={ (e) => dispatch( OwnerState(e) ) }/>
                   <br/>
                   { errorMsg.ownerStateError  && <span>{errorMsg.ownerStateError}</span>}
                  </div>

                   <div>
                   <input 
                   placeholder="country" 
                   value={Data.ownerAddress.country}
                   onChange={ (e) => dispatch( OwnerCountry(e) ) }/>
                   <br></br>
                   { errorMsg.countryError  && <span>{errorMsg.countryError}</span>}
                   </div>
                </div>
            </div>
                <button className='button' onClick={ (e) => FormHandleSubmit(e)
                }>
                    Register
                </button>

            </form>

        </section>
        </>
    );
    
};
const  data = connect(stateValue);
export const ConnectedForm =  data(RegForm);
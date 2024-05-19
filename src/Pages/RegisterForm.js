import { connect } from 'react-redux';
import '../PageStyles/RegForm.css';
import { MakeName , OwnerName, OwnerStreet, PhoneNum,MakeModel,Year,Color,ChassisNumber, HandleSubmit, ResetForm } from './Action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { regexCaps, regexDate, regexNumOnly, regexNumber,regexSapce } from '../RegExp/RegExp';
 
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
        if (!regexCaps.test(Data.ownerName)) errors.nameError = "Name must be alphabetic characters*";
        if (!Data.ownerName) errors.nameError = "Name is required*";

        if (!numberCheck) errors.phError = "Phone number should be 10 digits*";
        if (!Data.phoneNumber) errors.phError = "Phone number is required*";

        if (!regexCaps.test(Data.makerName)) errors.makeError = "Maker name must be alphabetic characters*";
        if (!Data.makerName) errors.makeError = "Make name is required*";

        if (!regexCaps.test(Data.modelName)) errors.moError = "Model name must be alphabetic characters*";
        if (!Data.modelName) errors.moError = "Model name is required*";

        if (!regexCaps.test(Data.colour)) errors.colorError = "Color must be alphabetic characters*";        
        if (!Data.colour) errors.colorError = "Color is required*";

        if (!yearCheck) errors.yearError = "Year is required*";

        if (!regexNumOnly.test(Data.chassisNumber)) errors.chassError = "Chassis number should be numbers*";
        if (!Data.chassisNumber) errors.chassError = "Chassis number is required*";

        if (!Data.ownerAddress.street) errors.streetError = "Address is required*";
        if(!regexSapce.test(Data.ownerAddress.street)) errors.streetError = 'Address must have characters*';
        // if (!Data.ownerAddress.city) errors.cityError = "City is required!";
        // if (!Data.ownerAddress.ownerState) errors.ownerStateError = "State is required!";
        // if (!Data.ownerAddress.country) errors.countryError = "Country is required!";
        return errors;
      };
 
    const FormHandleSubmit = (e) => {

        e.preventDefault();
       
        const errors = validateForm();
        setErrorMsg(errors);
        
        if (Object.keys(errors).length === 0) { 
            navigate('/vehicle-details'); 
            dispatch( HandleSubmit(e) );
        };        

    };
    
    const formReset = (e) => {
        e.preventDefault();
        dispatch(ResetForm(e));
    };
 
    return(
        <>
         
        <section className='form-container'>

           

            <form className='form'>
                   <h1 className='formHead'>Vehicle Registeration</h1>
              <div className='flex'>
                <label>Name<span id='starStyle'>*</span></label>
                <input 
                placeholder='Enter Your Name...'
                onChange={(e) => dispatch( OwnerName(e) )}
                value={Data.ownerName}
                />
                { errorMsg.nameError  && <span>{errorMsg.nameError}</span>}
                
              </div>
            <div className='flex'>
                
            <label>Phone Number<span id='starStyle'>*</span></label>
                <input 
                placeholder="Enter Your Phone.No..."
                value={Data.phoneNumber}
                onChange={ (e) => dispatch( PhoneNum(e) ) }/>
                { errorMsg.phError  && <span>{errorMsg.phError}</span>}
            </div>

                <div className='flex'>
                <label>Maker's Name <span id='starStyle'>*</span></label>
                <input 
                placeholder="Enter Vehicle Maker's Name..."
                value={Data.makerName}
                onChange={ (e) => dispatch( MakeName(e) ) }/>
                { errorMsg.makeError  && <span>{errorMsg.makeError}</span>}
                </div>

                <div className='flex'>
                <label>Model of Name<span id='starStyle'>*</span></label>
                <input 
                placeholder='vehicle Model Name...'
                value={Data.modelName}
                onChange={ (e) => dispatch( MakeModel(e) ) }/>
                { errorMsg.moError  && <span>{errorMsg.moError}</span>}
                </div>

                <div className='flex'>
                <label>Color<span id='starStyle'>*</span></label>
                <input 
                placeholder='Enter Your Vehicle Color...'
                value={Data.colour}
                onChange={ (e) => dispatch( Color (e) ) }/>
                { errorMsg.colorError  && <span>{errorMsg.colorError}</span>}
                </div>

                <div className='flex'>
                <label>Year<span id='starStyle'>*</span></label>
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
                <label>Chassis Number<span id='starStyle'>*</span></label>
                <input 
                placeholder="Enter Vehicle Chassis.NO..." 
                value={Data.chassisNumber}
                onChange={ (e) => dispatch( ChassisNumber(e) ) }/>
                { errorMsg.chassError  && <span>{errorMsg.chassError}</span>}
                </div>
                <div >
                <label>Address<span id='starStyle'>*</span></label>
                <div className='address-field'>

                   <div>
                   <textarea  
                   className='address-textarear'
                   rows={5}
                   cols={45 }
                   placeholder="Enter your Address..." 
                   value={Data.ownerAddress.street}
                   onChange={ (e) => dispatch( OwnerStreet(e) ) }/>
                   <br/>
                   {  errorMsg.streetError && <span>{ errorMsg.streetError}</span>}
                   </div>
  
                  {/* <div>
                  <input 
                   placeholder="city" 
                   value={Data.ownerAddress.city}
                   onChange={ (e) => dispatch( OwnerCity(e) ) }/>
                   <br/>
                   { errorMsg.cityError  && <span>{errorMsg.cityError}</span>}

                  </div> */}

                  {/* <div>
                  <input 
                   placeholder="state" 
                   value={
                    Data.ownerAddress.ownerState}
                   onChange={ (e) => dispatch( OwnerState(e) ) }/>
                   <br/>
                   { errorMsg.ownerStateError  && <span>{errorMsg.ownerStateError}</span>}
                  </div> */}

                   {/* <div>
                   <input 
                   placeholder="country" 
                   value={Data.ownerAddress.country}
                   onChange={ (e) => dispatch( OwnerCountry(e) ) }/>
                   <br></br>
                   { errorMsg.countryError  && <span>{errorMsg.countryError}</span>}
                   </div> */}
                   {/* <div className='pincode'>
                   <input 
                   placeholder="pincode" 
                   value={Data.ownerAddress.country}
                   onChange={ (e) => dispatch( OwnerCountry(e) ) }/>
                   <br></br>
                   { errorMsg.countryError  && <span>{errorMsg.countryError}</span>}
                   </div> */}
                </div>
                </div>
                <div className='btn-container-form'>
                <button className='resetbtn' onClick={ (e) => formReset(e)
                }>
                    Reset
                </button>
                <button className='button' onClick={ (e) => FormHandleSubmit(e)
                }>
                    Register
                </button>
                </div>

            </form> 
            
        </section>
        </>
    );
    
};
const  data = connect(stateValue);
export const ConnectedForm =  data(RegForm);
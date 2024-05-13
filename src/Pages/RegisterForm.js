import { connect } from 'react-redux';
import '../PageStyles/RegForm.css';
import { MakeName, OwnerCity, OwnerCountry, OwnerName, OwnerState, OwnerStreet, PhoneNum,MakeModel,Year,Color,ChassisNumber, HandleSubmit } from './Action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



const stateValue = (state) =>{

   return { Data:state}

};



function RegForm({Data}){
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return(
        <>
        <section className='form-container'>

            <h1>Vehicle Register</h1>

            <form className='form'>

                <label>Name:</label>
                <input 
                onChange={(e) => dispatch( OwnerName(e) )}
                value={Data.ownerName}
                />

                <label>Address:</label>
                <div className='address-field'>

                   <input 
                   placeholder="street" 
                   value={Data.ownerAddress.street}
                   onChange={ (e) => dispatch( OwnerStreet(e) ) }/>

                   <input 
                   placeholder="city" 
                   value={Data.ownerAddress.city}
                   onChange={ (e) => dispatch( OwnerCity(e) ) }/>
                   <input 
                   placeholder="state" 
                   value={
                    Data.ownerAddress.ownerState}
                   onChange={ (e) => dispatch( OwnerState(e) ) }/>
                   <input 
                   placeholder="country" 
                   value={Data.ownerAddress.country}
                   onChange={ (e) => dispatch( OwnerCountry(e) ) }/>
                </div>

                <label>Phone Number:</label>
                <input 
                placeholder="Phone Number"
                value={Data.phoneNumber}
                onChange={ (e) => dispatch( PhoneNum(e) ) }/>

                <label>Maker's Name :</label>
                <input 
                placeholder=""
                value={Data.makerName}
                onChange={ (e) => dispatch( MakeName(e) ) }/>

                <label>Model of Name:</label>
                <input 
                placeholder=''
                value={Data.modelName}
                onChange={ (e) => dispatch( MakeModel(e) ) }/>

                <label>Colour</label>
                <input 
                placeholder=''
                value={Data.colour}
                onChange={ (e) => dispatch( Color (e) ) }/>

                <label>Year</label>
                <input
                placeholder=''
                value={Data.year}
                onChange={ (e) => dispatch(
                    Year(e) ) }/>

                <label>Chassis Number:</label>
                <input 
                placeholder="" 
                type="number"
                value={Data.chassisNumber}
                onChange={ (e) => dispatch( ChassisNumber(e) ) }/>

                <button onClick={ (e) =>{
                      dispatch( HandleSubmit(e) );
                     navigate('/table'); 
                    }
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
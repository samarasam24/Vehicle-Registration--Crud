import { connect } from 'react-redux';
import '../PageStyles/RegForm.css';
import { MakeName, OwnerCity, OwnerCountry, OwnerName, OwnerState, OwnerStreet, PhoneNum,MakeModel,Year,Color,ChassisNumber, HandleSubmit } from './Action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './NavBar';




const stateValue = (state) =>{
 
   return { Data:state}

};



function RegForm({Data}){
   
    const dispatch = useDispatch();
    const navigate = useNavigate();
     
 
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
                
              </div>
            <div className='flex'>
                
            <label>Phone Number:</label>
                <input 
                placeholder="Enter Your Phone.No..."
                value={Data.phoneNumber}
                onChange={ (e) => dispatch( PhoneNum(e) ) }/>
                 
            </div>

                <div className='flex'>
                <label>Maker's Name :</label>
                <input 
                placeholder="Enter Vehicle Maker's Name..."
                value={Data.makerName}
                onChange={ (e) => dispatch( MakeName(e) ) }/>
                </div>
                <div className='flex'>
                <label>Model of Name:</label>
                <input 
                placeholder='vehicle Model Name...'
                value={Data.modelName}
                onChange={ (e) => dispatch( MakeModel(e) ) }/>
                </div>
                <div className='flex'>
                <label>Color</label>
                <input 
                placeholder='Enter Your Vehicle Color...'
                value={Data.colour}
                onChange={ (e) => dispatch( Color (e) ) }/>
                </div>
                <div className='flex'>
                <label>Year</label>
                <input
                placeholder='Enter Vehicle Mfg.Year..'
                value={Data.year}
                onChange={ (e) => dispatch(
                    Year(e) ) }/>
                </div>
                <div className='flex'>
                <label>Chassis Number:</label>
                <input 
                placeholder="Enter Vehicle Chassis.NO..." 
                type="number"
                value={Data.chassisNumber}
                onChange={ (e) => dispatch( ChassisNumber(e) ) }/>
                </div>
                <div >
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
            </div>
                <button className='button' onClick={ (e) =>{
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
import '../PageStyles/NavBar.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png';
import { useState } from 'react';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

export function Navbar() {

  const [mobileView,setMobileView] = useState(false);
//   const [ logoName,setLogoName ] = useState('');

//   useEffect( ()=> {

//     axios.get("https://65b1d9849bfb12f6eafc3b4b.mockapi.io/Vehicle-Registration")
//     .then( response =>{
     
//       setLogoName(response.data[response.data.length-1].ownerName.toUpperCase());
    
//     })

//     .catch( error => {
//           console.error(error);
          
//     }
//     )

// },[logoName]
// ); 

    return( 
        <>
        <nav>
             
                <h1 className='logobrand'>Vehicle Registration</h1> 
                <i className='bx bx-menu'   id='hamburger' onClick={ () => setMobileView( !mobileView ) }></i>

             
               <div className={!mobileView?'':'mobileView'}>
                <NavLink 
                  to="/create-vehicle-details" 
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                   Add Vehicle
                </NavLink>
                <NavLink 
                  to="/all-vehicle-details" 
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                 All Entries
                </NavLink>
                <NavLink 
                  to="/edit-vehicle-details?/:id" 
                  className={({ isActive }) => (isActive ? "active-link" : "deactive-link")}
                >
                 Modify Entry
                </NavLink>
                 <img src={logo} alt='icon' />
                 {/* <div className='logoFirstLetter'>{logoName[0]}</div> */}
               </div>
             
        </nav>
        </>
    );
};
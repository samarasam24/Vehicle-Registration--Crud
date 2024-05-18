import '../PageStyles/NavBar.css';
import { NavLink } from 'react-router-dom';
import logo from '../images/f19e4f665f2c7528e72df51b28e660f7-removebg-preview.png'
 

export function Navbar() {

    return( 
        <>
        <nav>
             
                <h1 className='logobrand'>Vehicle Registration</h1> 
             

             
               <div>
                <NavLink 
                  to="/create-vehicle-details" 
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  Register
                </NavLink>
                <NavLink 
                  to="/vehicle-details" 
                  className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                  List
                </NavLink>
                <NavLink 
                  to="/edit-vehicle-details?/:id" 
                  className={({ isActive }) => (isActive ? "active-link" : "deactive-link")}
                >
                 Edit
                </NavLink>
                 <img src={logo} alt='icon' />
               </div>
             
        </nav>
        </>
    );
};
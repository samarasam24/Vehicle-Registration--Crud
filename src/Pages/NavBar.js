import '../PageStyles/NavBar.css';
import vehicleImg from '../images/vehicel_png.png';

export function Navbar() {

    return( 
        <>
        <nav>
            <div>
                <h1 className='logobrand'>Vehicle Registration</h1> 
                <img 
                  id='logoImg'
                  src={vehicleImg} alt='vehicelPng' width='100%' height='100%'/>
            </div>

            <div>
                <a href='/'>Form</a>
                <a href='/table'>List</a>
            </div>
        </nav>
        </>
    );
};
import '../PageStyles/NavBar.css';
 

export function Navbar() {

    return( 
        <>
        <nav>
             
                <h1 className='logobrand'>Vehicle Registration</h1> 
             

             
               <div>
               <a href='/'>Form</a>
                <a href='/table'>List</a>
               </div>
             
        </nav>
        </>
    );
};
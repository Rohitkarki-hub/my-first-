import React, {useEffect,   useState} from 'react'
import './Navbar.css'
import { MenuList } from './Menulist'
import { NavLink,Link,useHistory } from 'react-router-dom'
import { auth , db} from '../config/config'
import { Icon } from 'react-icons-kit'
import { cart } from 'react-icons-kit/entypo/cart'




const Navbar =({totalProducts})=>{
   
  const history = useHistory();
    // handle logout
    const handleLogout = () => {
      auth.signOut().then(() => {
          history.push('/login');
      })
  }
  //DROP DOWN MENU
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const dropdownHandler = () => {
    setDropDownOpen(!dropDownOpen);
  };


  function GetCurrentUser(){
    const [user, setUser]=useState(null);
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                db.collection('users').doc(user.uid).get().then(snapshot=>{
                    setUser(snapshot.data().Name);
                })
            }
            else{
                setUser(null);
            }
        })
    },[])
    return user;
}

const user = GetCurrentUser();
// console.log(user);

 


  const [clicked, setClicked] =useState(false);
   const menulist =MenuList.map(({url,title},index) =>{
    return(
       <li key={index}>
           <NavLink exact to={url} activeClassName="active">{title}</NavLink>
       </li>
    );
   });
   
   const handleClick=()=>{
     setClicked(!clicked);
   };
  
  return(
    <nav>
        <div className="logo">
         <Link to={'/'} className="logo__link">Gamer<font>Choice</font></Link>
        </div >
        <div className="menu-icon" onClick={handleClick}>
         <i className={ clicked ?"fas fa-times":"fa fa-bars"}></i>
        </div>
        <ul className={clicked ?"menu-list":"menu-list close"}>{menulist}</ul>
        {!user &&<>
        <div className="loginbtn">
         
          <Link to='/login' className="button">Login</Link>
        
          </div> </>}
          {user &&  <>

            <div>
              <Link className='navlink' to="/"></Link></div>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="cart">
                            <Icon icon={cart} size={20}/>
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                   <div className="rightDropdown">                     
                   <h1   onClick={dropdownHandler} >{user} </h1>
                   <ul className={dropDownOpen ? "dropdown active" : "dropdown"}>
                     <p>Hello sir</p>
                     <p onClick={() => handleLogout()}>Logout</p>
                     
                   </ul>

                





                   </div>
                    



            </>}
          
      
    </nav>
    
  );
  }
export default Navbar;


import React ,{useEffect}from 'react'
import { useSelector } from 'react-redux'
import { useNavigate,Link } from 'react-router-dom'
import { LogOutUser } from '../Store/authStore'
import { useDispatch } from 'react-redux'

const Navbar = () => {
  const {isAuth,AuthUser} =  useSelector((state)=>state.auth)
   const navigate = useNavigate()
   const dispatch = useDispatch()
   useEffect(()=>{},[AuthUser])
  return (
    <div className="navbar bg-base-100 shadow-lg">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl" >WaveChat</Link>
  </div>
  <div className="flex p-2 gap-2">
   
    {isAuth?<div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            src={AuthUser.image} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
           
          </Link>
        </li>
        <li><Link to="/themes">Themes</Link></li>
        <li onClick={
          ()=>{
            dispatch(LogOutUser())
            navigate('/login')
          }
        }><a className='text-red-600'>Logout</a></li>
      </ul>
    </div>
    : 
    <div className='flex justify-center items-center gap-4'>
       <button className='btn btn-soft' onClick={()=>{navigate('/login')}} >logIn</button>
       <button className= 'btn btn-primary' onClick={()=>{navigate('/signup')}}>SignUp</button>
    </div>}

  </div>
</div>
  )
}

export default Navbar
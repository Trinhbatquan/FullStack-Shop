import React, {useState, useEffect} from 'react'
import { Header } from 'components';
import { NavLink, useNavigate} from 'react-router-dom';
import { loginUser } from 'api/index';
import Loading from './../components/loadingToast/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { loginUserShop } from 'reduxToolkit/userSlice';
import { getTypeToast } from 'reduxToolkit/toastSlice';
import { useLocation } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const location = useLocation()?.search?.split("?")
    let redirectProduct = ""
    let productIdRedirect = ""
    if (location) {
         redirectProduct = location[1]?.split("=/")[1]
         productIdRedirect = location[2]?.split("=")[1]
    }

    // const currentUser = useSelector((state) => state.userSlice.user)
    // console.log({currentUser})


    const handleSubmit= (e) => {
        e.preventDefault();
        setIsLoading(true)
        loginUser(email, password).then((user) => {
           if (user) {
           
               dispatch(loginUserShop(user))
               setIsLoading(false)
               localStorage.setItem('userShop', JSON.stringify(user))
               if (redirectProduct === "product") {
                navigate(`/products/${productIdRedirect}`)
               } else if (redirectProduct === "deliveryAddress"){
                navigate("/deliveryAddress")
               } else {
                navigate("/")
                toast.success("Login Successfully!", 
                {
                    theme: "colored",
                    autoClose: 3000,
                    containerId: 'A',
                    
                }
                )
               }
              
            //    dispatch(getTypeToast("success"))
           } else {
            setIsLoading(false)
            localStorage.setItem('userShop', null)
            // toast.error("Login Failed", {
            //     theme: "colored",
            //     autoClose: 3000
            // })
           }
        })
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('userShop'))) {
            navigate("/")
        }
    }, [])


  return (

    <>
        <Header />
        <div className='flex items-center justify-center w-full'>
        <ToastContainer />
            
            <div 
                className='shadow-lg backdrop-blur-sm 
                rounded-sm px-2 py-4 mt-16 border border-gray-200'
                style={{minWidth: '30%', width: '30%'}}
            
            >
                {isLoading && <Loading />}
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center'
                    style={{minWidth: '100%', width: '100%'}}
                >
                    <input className="py-3 px-4 mb-3 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto"  name="email" type="email" placeholder='Email'
                    style={{maxWidth: '90%', width: '90%'}}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <input className="py-3 px-4 mb-6 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto" name="password" type="password" placeholder='Password'
                    style={{maxWidth: '90%', width: '90%'}}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" className='py-4 px-4 mb-6 mt-1 cursor-pointer text-headingColor text-lg 
                    font-semibold opacity-80 hover:opacity-100
                    mx-auto' value="LOGIN"
                    style={{maxWidth: '90%', width: '90%', backgroundColor: '#1cb803'}}
                    
                    />
                </form>


                <NavLink to="/register?redirect=/">
                    <p className='text-lg text-headingColor opacity-80 cursor-pointer mx-auto text-center'>Create Account</p>
                </NavLink>
            </div>
        
        </div>
    </>
  )
}

export default Login

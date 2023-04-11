import React, {useState, useEffect} from 'react'
import { Header } from 'components';
import { NavLink, useNavigate} from 'react-router-dom';
import { registerUser } from 'api/index';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserShop } from 'reduxToolkit/userSlice';
import { getTypeToast } from 'reduxToolkit/toastSlice';
import Loading from './../components/loadingToast/Loading';

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleSubmit= (e) => {
        e.preventDefault();
        setIsLoading(true)
        registerUser(name, email, password).then((user) => {
            if (user) {
                dispatch(loginUserShop(user));
                setIsLoading(false)
                localStorage.setItem('userShop', JSON.stringify(user))
                navigate("/")
                dispatch(getTypeToast("success"))
            } else {
                localStorage.setItem('userShop', null)
                setIsLoading(false)
                dispatch(getTypeToast("danger"))
            }
        })
        setTimeout(() => {
            dispatch(getTypeToast(null))
        }, 3000)

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


            <div 
                className='shadow-lg backdrop-blur-sm 
                rounded-sm px-2 py-4 mt-16 border border-gray-200'
                style={{minWidth: '30%', width: '30%'}}
            
            >
                <form
                    onSubmit={handleSubmit}
                    className='flex flex-col items-center'
                    style={{minWidth: '100%', width: '100%'}}
                >

                    <input className="py-3 px-4 mb-3 mt-1 bg-slate-200 text-headingColor text-lg 
                    placeholder:text-headingColor placeholder:text-lg
                    placeholder:opacity-70 mx-auto"  name="username" type="text" placeholder='UserName'
                    style={{maxWidth: '90%', width: '90%'}}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
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
                    mx-auto' value="Register"
                    style={{maxWidth: '90%', width: '90%', backgroundColor: '#1cb803'}}
                    
                    />
                </form>

                <p className='text-sm text-headingColor opacity-80 cursor-pointer mx-auto text-center'>
                    I have Account
                    {" "}
                    <NavLink to="/login?redirect=/">
                        <span className='text-blue-700 text-lg'>Login</span>
                    </NavLink>
                </p>
            </div>
        
        </div>
    </>
  )
}

export default Register

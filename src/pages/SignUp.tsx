import StyledInput from "../components/StyledInput.tsx";
import {IoIosMail, IoMdPerson} from "react-icons/io";
import {FaKey} from "react-icons/fa";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useToast} from "../context/ToastContext.tsx";
import {googleSignupService, signupService} from "../services/apiServices.ts";
import {ApiResponse} from "../interfaces/api.ts";
import {UserObject} from "../interfaces/user.ts";
import {GoogleLogin} from "@react-oauth/google";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store.ts";
import {login} from "../features/auth/authSlice.ts";


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch<AppDispatch>();
    const {showToast} = useToast();
    const navigate = useNavigate();

    const handleSignUp = async () => {
        if (username && email && password && !usernameError && !emailError && !passwordError) {
            const obj = {
                username: username,
                email: email,
                password: password
            };
            const res: ApiResponse = await signupService(obj);
            if (res.success) {
                dispatch(login(res.body as { user: UserObject; token: string}));
                navigate('/');
            } else {
                showToast({ type: "error", message: res.message})
            }
        } else {
            showToast({ type: 'error', message: 'Please enter valid data.' });
        }
    }


    return (
        <div className="bg-base-200 pt-20 min-h-screen flex">
            <div className="flex-1">
                <div className='w-full h-full flex justify-center items-center'>
                    <div className='w-full mx-16 md:mx-32'>
                        <div className='w-full flex justify-center items-center'>
                            <img src='/logo.png' className='w-48' alt='logo'/>
                        </div>
                        <div className='w-full flex justify-center items-center mb-8'>
                            <h3 className='text-xl'>Sign up with ClearLens</h3>
                        </div>
                        <div className='mb-4'>
                            <StyledInput icon={<IoMdPerson/>} placeholder='username' value={username} type='text'
                                         changeHandler={(e) => setUsername((e.target as HTMLInputElement).value)}
                                         blurHandler={() => {
                                             if (username.length < 6) {
                                                 setUsernameError("Username cannot be shorter than 6 characters");
                                             } else {
                                                 setUsernameError("");
                                             }
                                         }}
                            />
                            {usernameError &&
                                <div className='text-error'>
                                    {usernameError}
                                </div>
                            }
                        </div>
                        <div className='mb-4'>
                            <StyledInput icon={<IoIosMail/>} placeholder='email' value={email} type='text'
                                         changeHandler={(e) => setEmail((e.target as HTMLInputElement).value)}
                                         blurHandler={() => {
                                             const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

                                             if (email.length === 0) {
                                                 setEmailError("Email address cannot be blank");
                                             } else if (!regex.test(email)) {
                                                 setEmailError("Please enter a valid email address");
                                             } else {
                                                 setEmailError("");
                                             }
                                         }}
                            />
                            {emailError &&
                                <div className="text-error">
                                    {emailError}
                                </div>
                            }
                        </div>
                        <div className='mb-4'>
                            <StyledInput icon={<FaKey/>} placeholder='password' value={password} type='password'
                                         changeHandler={(e) => setPassword((e.target as HTMLInputElement).value)}
                                         blurHandler={() => {
                                             if (password.length < 8) {
                                                 setPasswordError("Password cannot be shorter than 8 characters");
                                             } else {
                                                 setPasswordError("");
                                             }
                                         }}
                            />
                            {passwordError &&
                                <div className='text-error'>
                                    {passwordError}
                                </div>
                            }
                        </div>
                        <button className='btn btn-primary w-full' onClick={handleSignUp}>Signup</button>
                        <div className="divider">or</div>
                        <div className="w-full flex justify-center items-center mb-4">
                            <GoogleLogin
                                onSuccess={async credentialResponse => {
                                    const obj = {
                                        token: credentialResponse.credential || ''
                                    }

                                    const res = await googleSignupService(obj);
                                    if (res.success) {
                                        dispatch(login(res.body as { user: UserObject; token: string }));
                                        navigate('/');
                                    } else {
                                        showToast({type: "error", message: res.message})
                                    }
                                }}
                                onError={() => {
                                    showToast({type: 'error', message: 'Google Sign-in failed'});
                                }}
                                text="signup_with"
                                width="100%"
                                locale="en"
                                size="large"
                                theme="outline"
                                shape="rectangular"
                                logo_alignment="left"
                            />
                        </div>
                        <h5>Already have an account? <Link to='/signin' className='link link-primary'>SignIn</Link></h5>
                    </div>
                </div>
            </div>
                <div className="flex-1 hidden md:flex">
                <div
                    className="hero"
                    style={{
                        backgroundImage: "url('/prescription_glasses.jpg')",
                    }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-neutral-content text-center">
                        <div className="max-w-md">
                            <h1 className="mb-5 text-5xl font-bold">Join ClearLens</h1>
                            <p className="mb-5">
                                Create your account and start your journey to sharper style and clearer vision.
                                Enjoy exclusive deals, fast checkout, and a personalized eyewear experience made
                                just for you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;

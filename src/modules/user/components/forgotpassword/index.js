
import React, { useState, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useSwal from '../../../../common/Errors/SwalCall'
import { POSTREQUEST } from '../../../../config/requests'
import { endpoints } from '../../../../config/endpoints'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../../Store/Features/LoaderSlice'



function ForgotPage() {
    const [email, setEmail] = useState(sessionStorage.getItem("email") || "")
    const [otp, setotp] = useState("")
    const [password, setPassword] = useState("")
    const [visible, setvisible] = useState(sessionStorage.getItem("visible") || 1)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const fire = useSwal()
    async function handlesubmit() {
        try {
            dispatch(showLoader())
            var data = null
            if (visible === 1) {
                if (!email)
                    return fire("", "use a valid email")
                data = await POSTREQUEST(endpoints.otpsend, { email })
            }
            if (visible === 2) {
                if (!otp)
                    return fire("", "enter an otp")
                const obj = { email, number: otp };
                data = await POSTREQUEST(endpoints.otpverify, obj)
            }
            if (visible === 3) {
                if (!(password.length >= 8 && /[0-9]/.test(password) && /[&._-]/.test(password))) {
                    return fire("error", "use a strong password!")
                }
                const obj = { email, password };
                data = await POSTREQUEST(endpoints.passwordchange, obj)
            }
            if (data === null || data.type === "failure") {
                fire("error", data.result);
            }
            else if (data.type === 'success') {
                if (visible === 1) {
                    sessionStorage.setItem("email", email)
                    sessionStorage.setItem("visible", 2)
                    setvisible(2)
                }
                else if (visible === 2) {
                    setvisible(3)
                }
                else if (visible === 3) {
                    sessionStorage.removeItem("email")
                    sessionStorage.removeItem("visible")
                    navigate("/login")
                }
                fire("success", data.result,);
            }
            dispatch(hideLoader())
        }

        catch (e) {
            dispatch(hideLoader())
            fire("error", e.message)
        }
    }

    return (
        <div className={`LoginSignUpPage`}>
            <div className={'infoDiv'}>
                <motion.form
                    initial={{ x: -1000 }}
                    transition={{ duration: .5 }}
                    animate={{ x: 0 }}
                    onSubmit={e => { e.preventDefault(); handlesubmit() }}
                >
                    <div className={'tagDiv'}>
                        <h1
                            style={{
                                fontSize: "2rem",
                                fontWeight: 600,
                                textTransform: "capitalize"
                            }}
                        >Forgot Password
                            <span
                                style={{
                                    fontSize: ".9rem",
                                    marginLeft: ".5rem",
                                    color: "var(--secondary)"
                                }}
                            >
                                \  <Link to={"/"}>Go Home</Link>
                            </span>
                        </h1>

                        <p>A place to share knowledge and connect</p>
                    </div>
                    <div className={'textCenter'}>Sigin with Email</div>
                    {
                        visible === 1 &&
                        <Fragment>
                            <div className={'inputArea'}>
                                <h4>Email*</h4>
                                <input
                                    autoComplete='on'
                                    className='shadow1'
                                    type="email"
                                    placeholder='mail@gmail.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className={'inputArea'}>
                                <input type="submit" className="btn" value="Verify" />
                            </div>
                        </Fragment>
                    }
                    {
                        visible === 2 &&
                        <Fragment>
                            <div className={'inputArea'}>
                                <h4>Enter Your Code*</h4>
                                <input
                                    autoComplete='on'
                                    className='shadow1'
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setotp(e.target.value)} />
                            </div>
                            <div className={'inputArea'}>
                                <input type="submit" className="btn" value="Verify Code" />
                            </div>
                        </Fragment>
                    }
                    {
                        visible === 3 &&
                        <Fragment>
                            <div className={'inputArea'}>
                                <h4>Enter New Password*</h4>
                                <input
                                    autoComplete='on'
                                    className='shadow1'
                                    type="password"
                                    placeholder='abcdef1.'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className={'inputArea'}>
                                <input type="submit" className="btn" value="Update Password" />
                            </div>
                        </Fragment>
                    }

                    <div className={`inputArea link`}>
                        <p>Don't have an account?  <Link to="/signup">Signup</Link></p>
                    </div>
                    <div className={`inputArea link`}>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </motion.form>
            </div >
        </div >
    )
}

export default ForgotPage
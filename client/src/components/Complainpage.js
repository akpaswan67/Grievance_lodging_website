import React, { useContext, useEffect, useState } from 'react'
// import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./complainpage.css"
import { LoginContext } from './ContextProvider/Context';
import { useNavigate } from 'react-router-dom';

const AddComplaints = () => {

    const [inpval, setInpval] = useState({
        fname: "",
        adhaar: "",
		phone:"",
        address: "",
		district:"",
		state:"",
		department:"",
		complaint:"",
    });


    const { setLoginData } = useContext(LoginContext);
    const [data, setData] = useState(false);
    const history = useNavigate();
    
    const CompboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status === 401 || !data) {
            history("*");
        } else {
            console.log("user verify");
            setLoginData(data)
            history("/comp");
        }
    }
    useEffect(() => {
        setTimeout(() => {
            CompboardValid();
            setData(true)
        }, 2000)

    }, [])

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addComplaintsdata = async (e) => {
        e.preventDefault();

        const { fname, adhaar,phone,address, district, state, department, compalint} = inpval;

        if (fname === "") {
            toast.warning("fname is required!", {
                position: "top-center"
            });
        } 
		else if (adhaar === Number) {
            toast.error("adhaar is required!", {
                position: "top-center"
            });
        } 
		else if (adhaar.length < 12 && adhaar.length > 12) {
            toast.error("password must be 12 num!", {
                position: "top-center"
            });
        }
		else if (phone === Number) {
            toast.error("phone number is required!", {
                position: "top-center"
            });
        } 
		else if (phone.length < 10 && phone.length > 10 ) {
            toast.error("password must be 10 num!", {
                position: "top-center"
            });
        }
		else if (address === "") {
            toast.warning("address is required!", {
                position: "top-center"
            });
        }
		else if (district === "") {
            toast.warning("district is required!", {
                position: "top-center"
            });
        } 
		else if (state === "") {
            toast.warning("state is required!", {
                position: "top-center"
            });
        } 
		else if (department === "") {
            toast.warning("department is required!", {
                position: "top-center"
            });
        }  
		else if (compalint === "") {
            toast.warning("compalint is required!", {
                position: "top-center"
            });
        }
		else {
            // console.log("user registration succesfully done");
            const data = await fetch("/comp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, adhaar, phone, address, district, state, department, compalint
                })
            });

            const res = await data.json();
            // console.log(res.status);

            if (res.status === 201) {
                toast.success("Complaint added Successfully", {
                    position: "top-center"
                });
                setInpval({ ...inpval, fname: "", adhaar: "", phone: "", address: "" ,district:"", state:"",department:"",complaint:"" });
            }
        }
    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Add Complaints</h1>
                    </div>
                    <form>
                        <div className="form_input">
                            <label htmlFor="fname">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="adhaar">Adhaar</label>
                            <input type="adhaar" onChange={setVal} value={inpval.adhaar} name="adhaar" id="adhaar" placeholder='Enter Your Adhaar Number' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" onChange={setVal} value={inpval.phone} name="phone" id="phone" placeholder='Enter Your Phone Number ' />
                        </div>
						<div className="form_input">
                            <label htmlFor="address">Address</label>
                            <input type="text" onChange={setVal} value={inpval.address} name="address" id="address" placeholder='Enter Your Permanent Address' />
                        </div>
						<div className="form_input">
                            <label htmlFor="district">District</label>
                            <input type="text" onChange={setVal} value={inpval.district} name="district" id="district" placeholder='Enter Your District Name' />
                        </div>
						<div className="form_input">
                            <label htmlFor="state">State</label>
                            <input type="text" onChange={setVal} value={inpval.state} name="state" id="state" placeholder='Enter Your State Name' />
                        </div>
						<div className="form_input">
                            <label htmlFor="department">Department</label>
                            <input type="text" onChange={setVal} value={inpval.department} name="department" id="department" placeholder='Enter Your Department Name' />
                        </div>
						<div className="form_input">
						<label htmlFor="complaint">Complaint</label>
                            <textarea type="text" onChange={setVal} value={inpval.complaint} name="complaint" id="complaint" placeholder='Write your complaint here...' />
                        </div>

                        <button className='btn'>Submit</button>
                        {/* <p>Already have an account? <NavLink to="/">Log In</NavLink></p> */}
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default AddComplaints
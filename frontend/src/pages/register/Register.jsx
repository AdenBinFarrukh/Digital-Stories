import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Register.scss"

const Register = () => {

  const [inputs, setInputs] = useState(
    {
      username : "",
      email : "",
      password : "",
    }
  )

  const [err, setErr] = useState(null)
  
  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name] : e.target.value}))
  }

  console.log(inputs)

  const navigate = useNavigate()

  const handleClick = async e => {
    e.preventDefault()

    try{
      await axios.post("http://localhost:8800/api/auth/register", inputs)
      navigate("/login")
    }
    catch(err){
      setErr(err.response.data.message)
      console.log(err.response.data.message)
    }
  }

  return (
    <div className="register">
        <div className="card">
            <div className="left">
                <h1>Digital Stories</h1>
                <p>
                Lorem Ipsum is simply dummy text of the printing 
                and typesetting industry. Lorem Ipsum has been the 
                industry's standard dummy text ever since the 1500s
                </p>
                <span>Have an account</span>
                <Link to="/login">
                  <button>Login</button>
                </Link>
                
            </div>
            
            <div className="right">
                <h1>Register</h1>
                <form>
                    <input type="text" placeholder="Username" name="username" onChange={handleChange} />
                    <input type="email" placeholder="Email" name="email" onChange={handleChange}/>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange}/>
                    {err && err}
                    <button onClick={handleClick}>Register</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
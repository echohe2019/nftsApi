import styles from './Login.module.css'
import {FormSVG,Lock} from '../SVG/index'
import {useState} from "react";
import axios from "axios";
import {Notification} from "../index";
const Login = ({setLogin,setSignup,notification,setNotification}) => {

    const [user,setUser] = useState({email:'',password:''})
    const handleFormFieldChange = (fieldName,e)=>{
        setUser({...user,[fieldName]:e.target.value})
    }

    const apiLogin =async (e)=>{
        e.preventDefault();
        if(user.email==''||user.password==''){
            setNotification('Please Provider email and password')
        }
        try{
            const response = await axios({
                method: 'POST',
                url:`/api/v1/user/login`,
                withCredentials: true,
                data:{
                    email:user.email,
                    password:user.password,
                }
            })
            if(response.data.status=='success'){
                setNotification('You have Successfully login')
                localStorage.setItem('NFTApi token',response.data.token)
                setLogin(false)
                setNotification('')
                window.location.reload()
            }else if(response.data.status == 'fail'){
                setNotification(response.data.message)
            }
        }catch(error){
            console.log(error)
            setNotification(error.message)
        }
    }

  return (
      <>
          <div className={styles.card}>
              <div className={styles.card2}>
                  <form className={styles.form} onSubmit={apiLogin}>
                      <p id='heading' className={styles.heading}>
                          Login
                      </p>

                      <div className={styles.field}>
                          <FormSVG styleClass={styles.input_icon}/>
                          <input type='text' className={styles.input_field} placeholder='email' autoComplete='off' onChange={(e)=>handleFormFieldChange('email',e)}/>
                      </div>

                      <div className={styles.field}>
                          <Lock styleClass={styles.input_icon}/>
                          <input type='text' className={styles.input_field} placeholder='password' onChange={(e)=>handleFormFieldChange('password',e)}/>

                      </div>
                      <div className={styles.btn}>
                          <button className={styles.button1} onClick={()=>setLogin(false)}>Close</button>
                          <button className={styles.button2} onClick={()=>(setSignup(true),setLogin(false))}>Sign Up</button>
                      </div>
                      <button className={styles.button3} onClick={(e)=>apiLogin(e)}>Login</button>
                  </form>
              </div>
          </div>
          {notification !='' &&(
              <Notification notification={notification} setNotification={setNotification}/>
          )}
      </>


  )
};

export default Login;

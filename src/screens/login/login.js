import appFirebase from '../../firebase-config'
import React, { useState } from 'react'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
const auth = getAuth (appFirebase)
const Login = () => {

    const[registrando, setRegistrando] = useState(false)
      
    const functAutenticacion = async(e) =>{
        e.preventDefault();
        const correo = e.target.email.value;
        const contraseña = e.target.password.value;
        
        if (registrando) {
           try {
            await createUserWithEmailAndPassword(auth, correo, contraseña)
           } catch (error) {
             alert ("Asegurese que el correo este bien escrito o que la contraseña tenga mas de 8 caracteres")
           }
        }
        else{
            try {
                await signInWithEmailAndPassword(auth,correo, contraseña)   
            } catch (error) {
alert ("El correo o la contraseña son incorrectas")
            }
            
        }
    } 

  return (
    <div className='container'>
       <div className='row'>
        {/* columna mas pequeña */}
        <div className="col-md-4">
            <div className="padre"> 
                <div className="card card-body shadow-lg">
                    
                    <form onSubmit={functAutenticacion}>
                        <input type="text" placeholder='Ingresar Correo' className='cajatexto' id='email'/>
                        <input type="password" placeholder='Ingresar Contraseña' className='cajatexto' id='password'/>
                        <button className='btnform'>{registrando ? "Registrate" : "Inicia Sesion"}  </button>
                    </form>
                    <h4 className='texto'>{registrando ? "Si ya tienes cuenta " : "No tienes cuenta"}<button className='btnswicth' onClick={()=>setRegistrando(!registrando)}>{registrando ? "Inicia sesion" : "registrate"}</button></h4>
                </div>
            </div>
        </div>
        {/* columna mas grande */}
        {/* <div className="col-md-8">
            <img src={imagen} alt="" className='tamaño-imagen' />
        </div> */}

       </div>
    </div>
  ) 
}

export default Login

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegación
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import appFirebase from "../../firebase-config";
import { googleProvider } from "../../firebase-config"; // Firebase configurado
import "../Login/login.css";



const auth = getAuth(appFirebase);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registrando, setRegistrando] = useState(false);
  const navigate = useNavigate(); // Para redirigir al Marketplace

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (registrando) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registro exitoso");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Inicio de sesión exitoso");
        navigate("/"); // Redirige al Marketplace
      }
    } catch (err) {
      setError(
        registrando
          ? "Asegúrate de que el correo esté bien escrito o que la contraseña tenga más de 8 caracteres."
          : "Error al iniciar sesión. Verifica tus credenciales."
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Inicio de sesión con Google exitoso");
      navigate("/"); // Redirige al Marketplace
    } catch (err) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  return (
    <div className="login-container">
      <h1>{registrando ? "Registrarse" : "Iniciar Sesión"}</h1>
      <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{registrando ? "Registrarse" : "Iniciar sesión"}</button>
      </form>
      <button className="google-login" onClick={handleGoogleLogin}>
        Iniciar sesión con Google
      </button>
      {error && <p className="error-message">{error}</p>}
      <h4 className="register">
        {registrando ? "¿Ya tienes cuenta? " : "¿No tienes cuenta? "}
        <button className="btnswicth" onClick={() => setRegistrando(!registrando)}>
          {registrando ? "Inicia sesión" : "Regístrate"}
        </button>
      </h4>
    </div>
  );
};

export default Login;

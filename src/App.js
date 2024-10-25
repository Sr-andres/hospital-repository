import React, { useState, useEffect } from "react";
import "./App.css";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "./firebase-config";
import img1 from './img/img1.jpg';  // Importa la imagen
import logo from './img/logo.jpg';  // Importa el logo

function App() {
  const [imageUpload, setImageUpload] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);

  const uploadFile = () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `intento/cualquiercosa/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        setMessage("Tu archivo fue subido exitosamente."); // Aquí se establece el mensaje
        setUploadProgress(0); // Reinicia la barra de carga
        fetchFiles(); // Actualiza la lista de archivos
      });
    }).catch((error) => {
      setMessage("Hubo un error al subir el archivo."); // Mensaje en caso de error
      console.error("Error al subir archivo:", error);
    });
  };

  const fetchFiles = () => {
    const listRef = ref(storage, "intento/cualquiercosa/");
    listAll(listRef)
      .then((res) => {
        const files = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => ({ name: itemRef.name, url }))
        );
        Promise.all(files).then((fileList) => setFileList(fileList));
      })
      .catch((error) => {
        console.error("Error al listar los archivos:", error);
      });
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    const results = fileList.filter((file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFiles(results);
  }, [searchTerm, fileList]);

  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="Logo Hospital" className="hospital-logo" /> {/* Logo importado */}
        <div>
          <h2>Bienvenidos al repositorio del centro de salud del hospital san juan de dios de betulia</h2>
        </div>

        <div className="upload-section">
          <input
            type="file"
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
              setMessage("");
            }}
          />
          <button onClick={uploadFile}>Subir archivo</button>
          {message && <p>{message}</p>}
        </div>

        <div className="files-section">
          <h2>Archivos subidos</h2>
          <input
            type="text"
            placeholder="Buscar archivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <ul>
              {filteredFiles.map((file, index) => {
                if (index < 5) {
                  return (
                    <div>
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" download={file.name}>
                          {file.name}
                        </a>
                      </li>
                    </div>
                  )
                }
              })}
              {!Boolean(filteredFiles.length) && <li>No se encontraron archivos.</li>}
              {filteredFiles.length > 5 && <div><a href="/files" target="_white" style={{color:"black"}}>Mostrar más...</a></div>}
            </ul>
          )}
        </div>
        <img src={img1} alt="Hospital San Juan de Dios" className="hospital-image" /> {/* Imagen del hospital */}
        <h2>1. "Todos estamos aquí para ayudarnos unos a otros. Cuando estamos juntos, podemos cumplir cualquier cosa".</h2>
      </div>
      {/* ///redes socialaes/// */}
      <div class="copyright_section">
        <div class="container">
          <p class="copyright_text"><a href="https://www.linkedin.com/in/andres-sanabria-9b2749189/">Creado por Andres Sanabria </a></p>
        </div>
      </div>
    </div>

  );
}

export default App;

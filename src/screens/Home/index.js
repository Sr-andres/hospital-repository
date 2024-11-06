import React, { useState, useEffect } from "react";
import "../../App.css";
import { ref, uploadBytesResumable, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase-config";
import img1 from '../../img/img1.jpg';
import logo from '../../img/logo.jpg';

export default function Home() {
  const [imageUpload, setImageUpload] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);

  const uploadFile = () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `intento/cualquiercosa/${imageUpload.name}`);
    const uploadTask = uploadBytesResumable(imageRef, imageUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setMessage("Hubo un error al subir el archivo.");
        console.error("Error al subir archivo:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setMessage("Tu archivo fue subido exitosamente.");
          setUploadProgress(0);
          fetchFiles();
        });
      }
    );
  };

  const fetchFiles = () => {
    const listRef = ref(storage, "intento/cualquiercosa/");
    listAll(listRef)
      .then((res) => {
        const files = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => ({ name: itemRef.name, url }))
        );
        console.log(files)
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

console.log(fileList)

  return (
    <div className="App">
      <div className="container">
        <img src={logo} alt="Logo Hospital" className="hospital-logo" />
        <div className="MainTitleContainer">
          <h2 className="MainTitle"> Centro De Salud Del Hospital San Juan De Dios De Betulia</h2>
        </div>

        <div className="upload-section">
  <input
    id="Choosing"
    type="file"
    onChange={(event) => {
      setImageUpload(event.target.files[0]);
      setMessage("");
    }}
  />
  <button className="Upload" onClick={uploadFile}>Subir archivo</button>
  
  {/* Siempre visible, pero con el progreso cambiado */}
  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${uploadProgress}%` }}
    ></div>
  </div>

  {message && <p>{message}</p>}
</div>

        <div className="files-section">
          <h2 className="h-upload">Buscar Archivos</h2>
          <input id="barra-busqueda"
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
                    <div key={index}>
                      <li>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" download={file.name}>
                          {file.name}
                        </a>
                      </li>
                    </div>
                  );
                }
              })}
              {!Boolean(filteredFiles.length) && <li>No se encontraron archivos.</li>}
              {filteredFiles.length > 5 && (
                <div>
                  <a  href="/file" target="_white" style={{ color: "black" }}><button className="ViewMore">Ver Más</button></a>
                </div>
              )}
            </ul>
          )}
        </div>
        <img src={img1} alt="Hospital San Juan de Dios" className="hospital-image" />
        <h2 id="FinalSlogan">"Todos estamos aquí para ayudarnos unos a otros. Cuando estamos juntos, podemos cumplir cualquier cosa".</h2>
      </div>
      <div className="copyright_section">
        <div className="container">
          <p className="copyright_text">
            <a href="https://www.linkedin.com/in/andres-sanabria-9b2749189/" target="_blank" style={ {color: "black"}}>Creado por Andres Sanabria </a>
          </p>
        </div>
      </div>
      <div>
        <a href="/file"> aaa</a>
      </div>
    </div>
  );
}

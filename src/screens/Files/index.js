import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase-config';
import CategoryDashboard from '../Files/CategoryDashboard';
import { ref, getDownloadURL, listAll } from "firebase/storage";
import { storage } from "../../firebase-config";
import React, { useState, useEffect } from "react";

export default function Files({ FilesList }) {
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewFile, setPreviewFile] = useState(null); // Estado para almacenar la URL de la vista previa
  const [previewType, setPreviewType] = useState(null); // Estado para el tipo de vista previa (imagen o video)
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 }); // Estado para la posición de la vista previa

  const fetchFiles = (category) => {
    setLoading(true);
    const listRef = ref(storage, "intento/cualquiercosa/");
    listAll(listRef)
      .then((res) => {
        const files = res.items.map((itemRef) =>
          getDownloadURL(itemRef).then((url) => ({ name: itemRef.name, url }))
        );
        Promise.all(files).then((fileList) => {
          const filtered = category
            ? fileList.filter((file) => matchesCategory(file.name, category))
            : fileList;
          setFileList(filtered);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.error("Error al listar los archivos:", error);
        setLoading(false);
      });
  };

  const matchesCategory = (fileName, category) => {
    const extensions = {
      PDF: [".pdf"],
      DOCX: [".docx"],
      XLSX: [".xlsx"],
      Videos: [".mp4", ".avi", ".mov"],
      Audios: [".mp3", ".wav", ".aac", "opus"],
      Images: [".jpg", ".png", ".gif", ".jpeg"],
      TXT: [".txt"],
    };
    const categoryExtensions = extensions[category] || [];
    return categoryExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  useEffect(() => {
    if (selectedCategory) {
      fetchFiles(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchAllFiles = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "files"));
      const files = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setFilteredFiles(files);
    } catch (error) {
      console.error("Error fetching all files:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All Files") {
      fetchAllFiles();
    } else {
      fetchFiles(category);
    }
  };

  const handleMouseEnter = (file, event) => {
    const isImage = matchesCategory(file.name, "Images");
    const isVideo = matchesCategory(file.name, "Videos");
    if (isImage || isVideo) {
      setPreviewFile(file.url);
      setPreviewType(isImage ? "image" : "video"); // Definir el tipo de vista previa
      setPreviewPosition({ x: event.clientX + 20, y: event.clientY }); // Posición de la vista previa cerca del cursor
    }
  };

  const handleMouseLeave = () => {
    setPreviewFile(null); // Quita la vista previa al salir
    setPreviewType(null);
  };

  return (
    <div>
      <a href="/">Inicio</a>
      {!selectedCategory ? (
        <CategoryDashboard onSelectCategory={handleCategorySelect} />
      ) : (
        <div style={{ padding: '20px' }}>
          <h2>{selectedCategory}</h2>
          <button onClick={() => setSelectedCategory(null)}>Volver a Categorías</button>
          {loading ? (
            <div>
              <p>Cargando archivos...</p>
              <div className="spinner"></div>
            </div>
          ) : (
            <ul>
              {fileList.length > 0 ? (
                fileList.map((file, index) => (
                  <li 
                    key={index} 
                    onMouseEnter={(e) => handleMouseEnter(file, e)} 
                    onMouseLeave={handleMouseLeave}
                    style={{ position: 'relative' }} // Añadir posición relativa para el contenedor
                  >
                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                      {file.name}
                    </a>
                  </li>
                ))
              ) : (
                <p>No se encontraron archivos.</p>
              )}
            </ul>
          )}
          {/* Vista previa de archivo (imagen o video) */}
          {previewFile && (
            <div
              style={{
                position: 'fixed',
                left: previewPosition.x,
                top: previewPosition.y,
                border: '1px solid #ddd',
                padding: '5px',
                backgroundColor: '#fff',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000
              }}
            >
              {previewType === "image" ? (
                <img src={previewFile} alt="Vista previa" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              ) : (
                <video src={previewFile} controls style={{ width: '150px', height: '100px' }} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

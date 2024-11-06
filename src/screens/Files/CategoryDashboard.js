import React from 'react';

const categories = [
  { name: "PDF", description: "Ver todos los archivos de pdf" },
  { name: "DOCX", description: "Ver todo los documentos de word" },
  { name: "XLSX", description: "Ver todos los documentos de exel" },
  { name: "Videos", description: "Ver todos los videos" },
  { name: "Audios", description: "Ver todo los audios" },
  { name: "Images", description: "Ver todas las imagenes" },
  { name: "TXT", description: "ver todos los archivos de texto" },

];

const CategoryDashboard = ({ onSelectCategory }) => (
  <div style={{ padding: '20px' }}>
    <h1>Todos los archivos</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
      {categories.map((category, index) => (
        <div
          key={index}
          onClick={() => onSelectCategory(category.name)}
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryDashboard;

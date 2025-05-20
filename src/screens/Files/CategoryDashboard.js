import React from 'react';

const categories = [
  { 
    name: "PDF", 
    description: "Ver todos los archivos de PDF", 
    icon: "https://cdn-icons-png.flaticon.com/512/337/337946.png" 
  },
  { 
    name: "DOCX", 
    description: "Ver todos los documentos de Word", 
    icon: "https://cdn-icons-png.flaticon.com/512/7035/7035543.png" 
  },
  { 
    name: "XLSX", 
    description: "Ver todos los documentos de Excel", 
    icon: "https://cdn-icons-png.flaticon.com/512/732/732220.png" 
  },
  { 
    name: "Videos", 
    description: "Ver todos los videos",
    icon: "https://cdn-icons-png.flaticon.com/512/1179/1179069.png " 
  },
  { 
    name: "Audios", 
    description: "Ver todos los audios", 
    icon: "https://cdn-icons-png.flaticon.com/512/6780/6780548.png" 
  },
  { 
    name: "Images", 
    description: "Ver todas las imágenes", 
    icon: "https://cdn-icons-png.flaticon.com/128/11594/11594650.png" 
  },
  { 
    name: "TXT", 
    description: "Ver todos los archivos de texto", 
    icon: "https://cdn-icons-png.flaticon.com/128/8243/8243060.png" 
  },
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
            backgroundColor: '#f9f9f9',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Animación suave
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img 
            src={category.icon} 
            alt={`${category.name} icon`} 
            style={{ width: '50px', height: '50px', marginBottom: '10px' }} 
          />
          <h3>{category.name}</h3>
          <p>{category.description}</p>
        </div>
      ))}
    </div>
  </div>
);

export default CategoryDashboard;
  
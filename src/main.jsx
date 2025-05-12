import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import './styles/HomePage.css'

// Основна точка входу додатку, створюємо корінь дерева id 'root'
// StrictMode активує додаткові перевірки та попередження під час розробки
// BrowserRouter забезпечує маршрутизацію на основі URL
// App - головний компонент, містить весь інтерфейс додатку
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </StrictMode>
)

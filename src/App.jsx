import { useState } from 'react'
import './App.css'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import PainelControle from './pages/PainelControle/PainelControle.jsx';
import AnaliseFinanceira from './pages/AnaliseFinanceira/AnaliseFinanceira.jsx';
import EntradaVeiculo from './pages/PainelControle/Entrada/EntradaVeiculo.jsx';
import Teste from './pages/Teste.jsx';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Roteamento de telas, aqui chama a função da tela e o path é o caminho que vai ser acessado */}
        <Route path="/" element={<Login />} />
        <Route path="/teste" element={<Teste />} />
        <Route path="/painelControle" element={<PainelControle />} />
        <Route path="/painelControle/entrada" element={<EntradaVeiculo />} />
        <Route path="/analiseFinanceira" element={<AnaliseFinanceira />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

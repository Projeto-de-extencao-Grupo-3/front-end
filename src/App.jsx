import { useState } from 'react'
import './App.css'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login.jsx";
import PainelControle from './pages/PainelControle/PainelControle.jsx';
import AnaliseFinanceira from './pages/AnaliseFinanceira/AnaliseFinanceira.jsx';
import EntradaVeiculo from './pages/PainelControle/Entrada/EntradaVeiculo.jsx';
import EntradaVeiculoCamera from './pages/PainelControle/Entrada/EntradaVeiculoCamera.jsx';
import AguardandoVaga from './pages/PainelControle/AguardandoVaga/AguardandoVaga.jsx';
import Producao from './pages/PainelControle/Producao/Producao.jsx';
import Finalizado from './pages/PainelControle/Finalizado/Finalizado.jsx';
import AutorizacaoVeiculo from './pages/PainelControle/Autorizacao/AutorizacaoVeiculo.jsx';
import GestaoFuncionarios from './pages/Funcionarios/GestaoFuncionarios.jsx';
import ControleEstoque from './pages/Estoque/ControleEstoque.jsx';
import GestaoClientes from './pages/Clientes/GestaoClientes.jsx';
import Teste from './pages/Teste.jsx';
import TesteModal from './components/ModalNovoItem/TesteModal.jsx';
import MeusModais from './components/Modais/meusModais.jsx';  

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Roteamento de telas, aqui chama a função da tela e o path é o caminho que vai ser acessado */}
        <Route path="/" element={<Login />} />
        <Route path="/teste" element={<Teste />} />
        <Route path="/painelControle" element={<PainelControle />} />
        <Route path="/painelControle/entrada" element={<EntradaVeiculo />} />
        <Route path="/painelControle/entradaCamera" element={<EntradaVeiculoCamera />} />
        <Route path="/painelControle/autorizacao" element={<AutorizacaoVeiculo />} />
        <Route path="/painelControle/aguardandoVaga" element={<AguardandoVaga />} />
        <Route path="/painelControle/producao" element={<Producao />} />
        <Route path="/painelControle/finalizado" element={<Finalizado />} />
        <Route path="/clientes" element={<GestaoClientes />} />
        <Route path="/estoque" element={<ControleEstoque />} />
        <Route path="/funcionarios" element={<GestaoFuncionarios />} />
        <Route path="/analiseFinanceira" element={<AnaliseFinanceira />} />
        <Route path="/TesteModal" element={<TesteModal />} />
        <Route path="/MeusModais" element={<MeusModais />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App

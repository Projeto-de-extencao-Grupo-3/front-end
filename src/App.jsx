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
import HistoricoVeiculos from './pages/Clientes/Veiculos/HistoricoVeiculos.jsx';
import HistoricoVeiculosServico from './pages/Clientes/Veiculos/HistoricoVeiculosServico.jsx';
import Teste from './pages/Teste.jsx';
import TesteModal from './components/ModalNovoItem/TesteModal.jsx';
import TesteModalEditar from './components/ModalEditarItem/TesteModalEditar.jsx';
import TesteModalQtd from './components/ModalQtdItem/TesteModalQtd.jsx';
import EtapaOrcamento from './pages/PainelControle/Orcamento/EtapaOrcamento.jsx';
import PagamentoPendente from './pages/AnaliseServico/PagamentoPendente.jsx';
import PagamentoPendentePecas from './pages/AnaliseServico/PagamentoPendentePecas.jsx';
import PagamentoRealizado from './pages/AnaliseServico/PagamentoRealizado.jsx';
import NotaFiscal from './pages/AnaliseServico/NotaFiscal.jsx';
import Servicos from './components/Servicos&Itens/Abas/Servicos.jsx';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Roteamento de telas, aqui chama a função da tela e o path é o caminho que vai ser acessado */}
        <Route path="/" element={<Login />} />
        <Route path="/teste" element={<Teste />} />

        {/* Roteamento do Painel de Controle */}
        <Route path="/painelControle" element={<PainelControle />} />
        <Route path="/painelControle/entradaCamera" element={<EntradaVeiculoCamera />} />
        <Route path="/painelControle/entrada" element={<EntradaVeiculo />} />
        <Route path="/painelControle/entrada/:placa" element={<EntradaVeiculoCamera />} />
        <Route path="/painelControle/entrada/:placa/:idOrdemServico" element={<EntradaVeiculoCamera />} />
        <Route path="/painelControle/orcamento" element={<EtapaOrcamento />} />
        <Route path="/painelControle/orcamento/:placa/:idOrdemServico" element={<EtapaOrcamento />} />
        <Route path="/painelControle/autorizacao" element={<AutorizacaoVeiculo />} />
        <Route path="/painelControle/autorizacao/:placa/:idOrdemServico" element={<AutorizacaoVeiculo />} />
        <Route path="/painelControle/aguardandoVaga" element={<AguardandoVaga />} />
        <Route path="/painelControle/aguardandoVaga/:placa/:idOrdemServico" element={<AguardandoVaga />} />
        <Route path="/painelControle/producao" element={<Producao />} />
        <Route path="/painelControle/producao/:placa/:idOrdemServico" element={<Producao />} />
        <Route path="/painelControle/finalizado" element={<Finalizado />} />
        <Route path="/painelControle/finalizado/:placa/:idOrdemServico" element={<Finalizado />} />
        
        {/* Roteamento de Clientes */}
        <Route path="/clientes" element={<GestaoClientes />} />
        <Route path="/clientes/veiculos" element={<HistoricoVeiculos />} />
        <Route path="/clientes/veiculos/servico" element={<HistoricoVeiculosServico />} />
        <Route path="/estoque" element={<ControleEstoque />} />
       
        {/* Roteamento de Funcionários */}
        <Route path="/funcionarios" element={<GestaoFuncionarios />} />
        
        {/* Roteamento de Análise Financeira */}
        <Route path="/analiseFinanceira" element={<AnaliseFinanceira />} />
        
        {/* Roteamento de Teste */}
        <Route path="/TesteModal" element={<TesteModal />} />
        <Route path="/TesteModalEditar" element={<TesteModalEditar />} />
        <Route path="/TesteModalQtd" element={<TesteModalQtd />} />
        <Route path="/PagamentoPendente" element={<PagamentoPendente />} />
        <Route path="/PagamentoPendentePecas" element={<PagamentoPendentePecas />} />
        <Route path="/PagamentoRealizado" element={<PagamentoRealizado />} />
        <Route path="/NotaFiscal" element={<NotaFiscal />} />
        <Route path="/Servicos&Itens/Servicos" element={<Servicos />} />



      </Routes>

    </BrowserRouter>
  )
}

export default App

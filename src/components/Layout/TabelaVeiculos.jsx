import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./TabelaVeiculos.module.css";
import veiculosService from '../../service/Veiculos.js';

const IconeOlho = () => (
  <svg style={{ width: 15, height: 15, fill: 'currentColor', flexShrink: 0 }} viewBox="0 0 24 24">
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
  </svg>
);

function TabelaVeiculos() {
  const { buscarVeiculosPorCliente } = veiculosService();
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [erro, setErro]         = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    async function carregarVeiculos() {
      try {
        setLoading(true);
        setErro(null);

        const dados = await buscarVeiculosPorCliente(id);
        console.log("Veículos carregados:", dados);
        setVeiculos(dados);

      } catch {
        setErro('Nenhum veículo encontrado.');
      } finally {
        setLoading(false);
      }
    }

    carregarVeiculos();
  }, []);

    console.log("back:", veiculos);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border" style={{ color: '#1b2a45' }} role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <span className="ms-3 fw-semibold" style={{ color: '#1b2a45' }}>Carregando veículos...</span>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="alert alert-warning d-flex align-items-center gap-2">
        <span>⚠️</span> {erro}
      </div>
    );
  }

  if (veiculos.length === 0) {
    return <div className="text-center text-secondary p-5">Nenhum veículo encontrado.</div>;
  }

  return (
    <div className="d-flex flex-column gap-3">
      {veiculos.map((veiculo, index) => (
        <div key={veiculo.id ?? index} className={`${styles['vehicle-card']} d-flex align-items-center gap-3 bg-white border rounded-3 p-3`}>

          {/* Avatar */}
          <div className={`${styles.avatar} ${veiculo.emProducao ? styles['avatar-gold'] : styles['avatar-navy']} d-flex align-items-center justify-content-center fw-bold text-white rounded-3 fs-4 flex-shrink-0`}>
            {veiculo.modelo?.charAt(0) ?? 'V'}
          </div>

          {/* Info */}
          <div className="flex-grow-1">
            <p className="mb-1 fw-bold" style={{ fontSize: '0.95rem', color: '#1b2a45' }}>
              {veiculo.modelo}{' '}
              <span className="fw-normal text-secondary" style={{ fontSize: '0.85rem' }}>
                STATUS: {veiculo.status}
              </span>
            </p>
            <div className="d-flex flex-wrap gap-3 text-secondary" style={{ fontSize: '0.8rem' }}>
              <span><strong>PLACA:</strong> {veiculo.placa}</span>
              <span><strong>ANO:</strong> {veiculo.ano_modelo}</span>
              {/* <span><strong>Total Serviços (2026):</strong> {veiculo.data}</span> */}
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex gap-2 flex-shrink-0">
            <a className={`${styles['btn-navy']} d-flex align-items-center gap-1`}
              onClick={(e) => { e.preventDefault(); navigate('/clientes/veiculos/servico', { state: {modelo: veiculo.modelo, placa: veiculo.placa, veiculo: veiculo.id_veiculo, cliente: veiculo.id_cliente } }); }}
            >
              <IconeOlho />
              Ver Histórico <span style={{ opacity: 0.7 }}>›</span>
            </a>
          </div>

        </div>
      ))}
    </div>
  );
}

export default TabelaVeiculos;
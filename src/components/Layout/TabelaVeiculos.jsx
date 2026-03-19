import { useEffect, useState } from 'react';
import styles from "./TabelaVeiculos.module.css";
// import { buscarVeiculos } from '../../services/veiculosService';

const IconeOlho = () => (
  <svg style={{ width: 15, height: 15, fill: 'currentColor', flexShrink: 0 }} viewBox="0 0 24 24">
    {/* Ícone de olho */}
    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12 4.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>
  </svg>
);

function TabelaVeiculos() {
  const [veiculos, setVeiculos] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [erro, setErro]         = useState(null);

  useEffect(() => {
    async function carregarVeiculos() {
      try {
        setLoading(true);
        setErro(null);
        // const dados = await buscarVeiculos();
        // Simulação de dados para teste
        const dados = [
        {
            id: 1,
            placa: 'FUB-5231',
            modelo: 'Volkswagen Tiguan',
            ano: '2015',
            status: 'Sem agendamento',
            totalServicos: 12,
            emProducao: false,
          },
        {
            id: 2,
            placa: 'FUB-5231',
            modelo: 'jetta',
            ano: '2015',
            status: 'Sem agendamento',
            totalServicos: 12,
            emProducao: false,
          },
          {
            id: 3,
            placa: 'ABC-1234',
            modelo: 'Honda Civic',
            ano: '2020',
            status: 'Em produção',
            totalServicos: 5,
            emProducao: true,
          },
          {
            id: 4,
            placa: 'ABC-1234',
            modelo: 'Corsa',
            ano: '2020',
            status: 'Em produção',
            totalServicos: 5,
            emProducao: true,
          },
        ]
        setVeiculos(dados);
      } catch{
        setErro('Nenhum veículo encontrado.');
      } finally {
        setLoading(false);
      }
    }

    carregarVeiculos();
  }, []);

//   Tratamento de loading
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border" style={{ color: '#1b2a45' }} role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <span className="ms-3" style={{ color: '#1b2a45', fontWeight: 600 }}>Carregando veículos...</span>
      </div>
    );
  }

//   Tratamento de erros e caso sem veículos
  if (erro) {
    return (
      <div className="alert d-flex align-items-center gap-2" style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 10, color: '#856404' }}>
        <span>⚠️</span> {erro}
      </div>
    );
  }

  if (veiculos.length === 0) {
    return (
      <div className="text-center p-5" style={{ color: '#888' }}>
        Nenhum veículo encontrado.
      </div>
    );
  }

// tabela
  return (
    <div className="w-100">
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
                <span className="fw-normal" style={{ fontSize: '0.85rem', color: '#666' }}>
                  STATUS: {veiculo.status}
                </span>
              </p>
              <div className="d-flex flex-wrap gap-3" style={{ fontSize: '0.8rem', color: '#444' }}>
                <span><strong>PLACA:</strong> {veiculo.placa}</span>
                <span><strong>ANO:</strong> {veiculo.ano}</span>
                <span><strong>Total Serviços (2026):</strong> {veiculo.totalServicos}</span>
              </div>
            </div>

            {/* Botões */}
            <div className="d-flex gap-2 flex-shrink-0">
              {veiculo.emProducao && (
                <a href="#" className={`${styles['btn-outline-navy']} d-flex align-items-center gap-1`}>
                  Ver Carro em Produção <span style={{ opacity: 0.7 }}>›</span>
                </a>
              )}
              <a href="#" className={`${styles['btn-navy']} d-flex align-items-center gap-1`}>
                <IconeOlho />
                Ver Histórico <span style={{ opacity: 0.7 }}>›</span>
              </a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default TabelaVeiculos;
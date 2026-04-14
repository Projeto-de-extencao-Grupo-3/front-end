import { useEffect, useState, useMemo } from 'react'; // ← adicionado useMemo
import styles from "./TabelaVeiculos.module.css";
import veiculosService from '../../service/Veiculos.js';
// import { useNavigate } from 'react-router-dom';

function TabelaServicos({ modelo, placa }) {
  const { buscarOrdensPorVeiculo } = veiculosService();
  const [servicos, setServicos]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [erro, setErro]           = useState(null);
  const [filtro, setFiltro]       = useState(fromProduction ? '1mes' : '3meses');
 
  const opcoesFiltro = [
    { value: '1mes',   label: 'Último mês'    },
    { value: '3meses', label: 'Últimos 3 meses' },
    { value: '6meses', label: 'Últimos 6 meses' },
    { value: '1ano',   label: 'Último ano'    },
  ];
 
  useEffect(() => {
    async function carregarServicos() {
      try {
        setLoading(true);
        setErro(null);
 
        // const dados = [
        //   { id: 1,  ordem: '#003', data: '10/11/2026', valor: 550.00, status: 'Em andamento' },
        //   { id: 2,  ordem: '#004', data: '10/11/2026', valor: 550.00, status: 'Em andamento' },
        //   { id: 3,  ordem: '#005', data: '10/11/2026', valor: 550.00, status: 'Em andamento' },
        //   { id: 4,  ordem: '#006', data: '31/12/2025', valor: 550.00, status: 'Concluído'    },
        //   { id: 5,  ordem: '#007', data: '31/12/2025', valor: 550.00, status: 'Concluído'    },
        //   { id: 6,  ordem: '#008', data: '31/12/2025', valor: 550.00, status: 'Concluído'    },
        //   { id: 7,  ordem: '#009', data: '10/09/2025', valor: 550.00, status: 'Concluído'    },
        //   { id: 8,  ordem: '#010', data: '10/09/2025', valor: 550.00, status: 'Concluído'    },
        //   { id: 9,  ordem: '#011', data: '10/09/2025', valor: 550.00, status: 'Concluído'    },
        //   { id: 10, ordem: '#012', data: '10/06/2025', valor: 550.00, status: 'Concluído'    },
        //   { id: 11, ordem: '#013', data: '10/06/2025', valor: 550.00, status: 'Concluído'    },
        //   { id: 12, ordem: '#014', data: '10/06/2025', valor: 550.00, status: 'Concluído'    },
        // ];
        // const dados = await buscarServicos(filtro);
        // setServicos(dados);
        const dados = await buscarOrdensPorVeiculo();
        setServicos(dados);
 
      } catch {
        setErro('Não foi possível carregar os serviços. Tente novamente.');
      } finally {
        setLoading(false);
      }
    }
 
    carregarServicos();
  },);

  // ← adicionado: converte "DD/MM/YYYY" → Date e filtra por período
  const parsarData = (dataStr) => {
    const [dia, mes, ano] = dataStr.split('/');
    return new Date(ano, mes - 1, dia);
  };

  const servicosFiltrados = useMemo(() => {
    const hoje = new Date();
    const limite = new Date();
    if (filtro === '1mes')   limite.setMonth(hoje.getMonth() - 1);
    if (filtro === '3meses') limite.setMonth(hoje.getMonth() - 3);
    if (filtro === '6meses') limite.setMonth(hoje.getMonth() - 6);
    if (filtro === '1ano')   limite.setFullYear(hoje.getFullYear() - 1);
    return servicos.filter((s) => parsarData(s.data) >= limite);
  }, [servicos, filtro]);
 
  const formatarValor = (valor) =>
    valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
 
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border" style={{ color: '#1b2a45' }} role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <span className="ms-3" style={{ color: '#1b2a45', fontWeight: 600 }}>Carregando serviços...</span>
      </div>
    );
  }
 
  if (erro) {
    return (
      <div className="alert d-flex align-items-center gap-2"
        style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: 10, color: '#856404' }}>
        <span>⚠️</span> {erro}
      </div>
    );
  }
 
  return (
    <div className={styles.wrapper}>
 
      {/* Cabeçalho */}
      <div className={`${styles.header} d-flex align-items-center justify-content-between mb-3`}>
        <h2 className={styles.titulo}>
          Total de Serviços ({servicosFiltrados.length}) {/* ← alterado */}
        </h2>
 
        <select
          className="form-select fs-5 p-3 bg-white border rounded-pill w-auto"
          style={{ borderColor: '#000' }}
          value={filtro}
          // onChange={(e) => setFiltro(e.target.value)}
        >
          {/* {opcoesFiltro.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))} */}
        </select>
      </div>
 
      {/* Lista */}
      {servicosFiltrados.length === 0 ? ( // ← alterado
        <div className="text-center p-5" style={{ color: '#888' }}>
          Nenhum serviço encontrado.
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {servicosFiltrados.map((servico, index) => ( // ← alterado
            <div
              key={servico.id ?? index}
              className={`${styles['servico-card']} d-flex align-items-center justify-content-between bg-white border rounded-3 px-3 py-3`}
            >
              {/* Lado esquerdo */}
              <div>
                <p className={styles['ordem-titulo']}>
                  Ordem de Serviço {servico.ordem}
                </p>
                <p className={styles['ordem-data']}>{servico.data}</p>
              </div>
 
              {/* Lado direito */}
              <div className="d-flex align-items-center gap-3">
                <span className={styles.valor}>
                  {formatarValor(servico.valor)}
                </span>
                <span className={`badge fs-5 p-3 ${(() => {
                  let statusClasses = 'bg-secondary-subtle border border-secondary text-secondary';
                  if (servico.status === 'Concluído') {
                    statusClasses = 'bg-success-subtle border border-success text-success';
                  } else if (servico.status === 'Em andamento') {
                    statusClasses = 'bg-warning-subtle border border-warning text-warning';
                  }
                  return statusClasses;
                })()}`}>
                  {servico.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
 
export default TabelaServicos;
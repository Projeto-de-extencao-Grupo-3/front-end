import { useEffect, useState, useMemo } from 'react';
import styles from "./TabelaVeiculos.module.css";
import veiculosService from '../../service/Veiculos.js';
import { useNavigate } from 'react-router-dom';

function TabelaServicos({ modelo, placa, veiculo }) {
  console.log("TabelaVeiculosServico - modelo: " + modelo + ", placa: " + placa + ", veiculo: " + JSON.stringify(veiculo));
  const { buscarOrdensPorVeiculo } = veiculosService();
  const navigate = useNavigate();
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState('3meses');

  const opcoesFiltro = [
    { value: '3meses', label: 'Últimos 3 meses' },
    { value: '6meses', label: 'Últimos 6 meses' },
    { value: '1ano', label: 'Último ano' }
  ];

  const formatarData = (dataISO) => {
    if (!dataISO) return "";

    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
  };

  const traduzirStatus = (status) => {
    return status || "Status indisponivel";
  };

  useEffect(() => {
    async function carregarServicos() {
      try {
        setLoading(true);
        setErro(null);

        console.log("🔎 VEICULO ENVIADO:", veiculo);

        const mapaFiltro = {
          '3meses': 3,
          '6meses': 6,
          '1ano': 12
        };

        const dados = await buscarOrdensPorVeiculo(veiculo, mapaFiltro[filtro]);

        console.log("🔥 DADOS QUE CHEGARAM:", dados);

        const dadosFormatados = (dados || []).map((item) => ({
          id: item.id_ordem_servico,
          ordem: `#${item.id_ordem_servico}`,
          data: item.data_saida_efetiva
            ? formatarData(item.data_saida_efetiva)
            : formatarData(item.data_saida_prevista),
          valor: item.valor_total,
          status: traduzirStatus(item.status)
        }));

        console.log("✅ FORMATADOS:", dadosFormatados);

        setServicos(dadosFormatados);

      } catch (error) {
        console.error("❌ ERRO REAL:", error);
        setErro('Não foi possível carregar os serviços.');
      } finally {
        setLoading(false);
      }
    }

    if (veiculo) {
      carregarServicos();
    }

  }, [veiculo, filtro]);

  // 🔐 Parser de data seguro
  const parsarData = (dataStr) => {
    if (!dataStr) return new Date(0);

    const [dia, mes, ano] = dataStr.split('/');
    return new Date(Number(ano), Number(mes) - 1, Number(dia));
  };

  // 🔎 Filtro por período
  const servicosFiltrados = useMemo(() => {
    const hoje = new Date();
    const limite = new Date();

    if (filtro === '3meses') limite.setMonth(hoje.getMonth() - 3);
    if (filtro === '6meses') limite.setMonth(hoje.getMonth() - 6);
    if (filtro === '1ano') limite.setFullYear(hoje.getFullYear() - 1);

    return servicos.filter((s) => parsarData(s.data) >= limite);
  }, [servicos, filtro]);

  // 💰 Formatação de valor
  const formatarValor = (valor) =>
    valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'R$ 0,00';

  // ⏳ Loading
  if (loading) {
    return (
      console.log("servicos:", servicos),
      console.log("servicosFiltrados:", servicosFiltrados),
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border" style={{ color: '#1b2a45' }} role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
        <span className="ms-3" style={{ color: '#1b2a45', fontWeight: 600 }}>
          Carregando serviços...
        </span>
      </div>
    );
  }

  // ⚠️ Erro
  if (erro) {
    return (
      <div
        className="alert d-flex align-items-center gap-2"
        style={{
          background: '#fff3cd',
          border: '1px solid #ffc107',
          borderRadius: 10,
          color: '#856404'
        }}
      >
        <span>⚠️</span> {erro}
      </div>
    );
  }

  return (


    <div className={styles.wrapper}>

      {/* Cabeçalho */}
      <div className={`${styles.header} d-flex align-items-center justify-content-between mb-3`}>
        <h2 className={styles.titulo}>
          Total de Serviços ({servicosFiltrados.length})
        </h2>

        <select
          className="form-select fs-5 p-3 bg-white border rounded-pill w-auto"
          style={{ borderColor: '#000' }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          {opcoesFiltro.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
      </div>

      {/* Lista */}
      {servicosFiltrados.length === 0 ? (
        <div className="text-center p-5" style={{ color: '#888' }}>
          Nenhum serviço encontrado.
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {servicosFiltrados.map((servico, index) => (
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

                <span
                  className={`badge fs-5 p-3 ${(() => {
                    let statusClasses = 'bg-secondary-subtle border border-secondary text-secondary';

                    if (servico.status === 'Com agendamento') {
                      statusClasses = 'bg-success-subtle border border-success text-success';
                    }
                    else if (servico.status === 'Em produção') {
                      statusClasses = 'bg-secondary-subtle border border-secondary text-secondary';
                    }
                    else if (servico.status === 'Sem agendamento') {
                      statusClasses = '';
                    }

                    return statusClasses;
                  })()}`}
                  style={
                    servico.status === 'Sem agendamento'
                      ? {
                        backgroundColor: '#0C2F52',
                        border: '1px solid #0C2F52',
                        color: '#fff'
                      }
                      : {}
                  }
                >
                  {servico.status}
                </span>
                <div className="d-flex gap-2 flex-shrink-0">
                  <a
                    className={`${styles['btn-navy']} ${styles['btn-vistorias']} d-flex align-items-center justify-content-center`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/painelControle/imagensAnexadas/${servico.id}`, {
                        state: { modelo: veiculo.modelo, placa: veiculo.placa, veiculo: veiculo.id_veiculo, cliente: veiculo.id_cliente }
                      });
                    }}
                  >
                      <i className="bx bx-camera" style={{ marginRight: '0.5rem' }} ></i>
                    Ver Vistorias
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TabelaServicos;
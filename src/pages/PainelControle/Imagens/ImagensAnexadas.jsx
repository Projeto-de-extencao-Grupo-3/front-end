import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../../../components/Layout/Layout";
import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import ServicosEItensLogic from "../../../service/ServicosEItens.js";
import Arquivo from "../../../service/Arquivo.js"; 
import "../../ConfigLayoutWorkflow.css";

function ImagensAnexadas() {
    const { idOrdemServico } = useParams();
    const navigate = useNavigate();
    const { buscarOrdem } = ServicosEItensLogic();
    
   
    const [imagens, setImagens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [filtroVistoria, setFiltroVistoria] = useState("VISTORIA_INICIAL");
    const [imageCounts, setImageCounts] = useState({ VISTORIA_INICIAL: 0, VISTORIA_FINAL: 0 });
    const [ticket, setTicket] = useState(null);

    //busca imagens anexada via service
    const carregarImagens = async (categoria) => {
        if (!idOrdemServico) return;
        try {
            const data = await Arquivo.buscarImagensVistoria(idOrdemServico, categoria);
            setImagens(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
            setImagens([]);
        }
    };

    const carregarContagens = async () => {
        if (!idOrdemServico) return;
        try {
            const [inic, fina] = await Promise.all([
                Arquivo.buscarImagensVistoria(idOrdemServico, 'VISTORIA_INICIAL'),
                Arquivo.buscarImagensVistoria(idOrdemServico, 'VISTORIA_FINAL')
            ]);
            setImageCounts({
                VISTORIA_INICIAL: Array.isArray(inic) ? inic.length : 0,
                VISTORIA_FINAL: Array.isArray(fina) ? fina.length : 0
            });
        } catch (error) {
            console.error('Erro ao carregar contagens de imagens:', error);
            setImageCounts({ VISTORIA_INICIAL: 0, VISTORIA_FINAL: 0 });
        }
    };

    // busca dados da os
    const carregarDadosOrdem = async () => {
        if (!idOrdemServico) return;
        try {
            const dados = await buscarOrdem(idOrdemServico);
            if (dados && dados.busca_simples) {
                setTicket({
                    ...dados.busca_simples,
                    servicos: dados.busca_simples.servicos || [],
                    produtos: dados.busca_simples.produtos || []
                });
            }
        } catch (e) {
            console.error("Erro ao carregar dados da OS:", e);
        }
    };

    useEffect(() => {
        if (idOrdemServico) {
            carregarContagens();
            carregarImagens(filtroVistoria);
            carregarDadosOrdem();
        }
    }, [idOrdemServico, filtroVistoria]);

    // Lógica de Upload via Service
    const handleFileUpload = async (event) => {
        const arquivoSelecionado = event.target.files[0];
        if (!arquivoSelecionado || !idOrdemServico) return;

        setCarregando(true);
        try {
            await Arquivo.uploadVistoria(idOrdemServico, arquivoSelecionado, filtroVistoria);
            await carregarImagens(filtroVistoria);
            await carregarContagens();
        } catch (error) {
            console.error('Erro no upload:', error);
            alert("Erro ao enviar imagem.");
        } finally {
            setCarregando(false);
            event.target.value = ""; 
        }
    };

    const handleDeleteImage = async (idArquivo) => {
        const removidoComSucesso = await Arquivo.deletarImagemVistoria(idArquivo);

        if (removidoComSucesso) {
            await carregarImagens(filtroVistoria);
            await carregarContagens();
        }
    };

    // erro caso não tenha id
    if (!idOrdemServico) {
        return (
            <Layout ativo={"painel"}>
                <div className="container-fluid p-5 text-center">
                    <i className='bx bx-error-circle' style={{ fontSize: '4rem', color: '#ccc' }}></i>
                    <h2 className="mt-3">Nenhuma Ordem de Serviço Selecionada</h2>
                    <p className="text-muted">Selecione uma OS na listagem para gerenciar as imagens.</p>
                    <button className="btn btn-dark mt-3" onClick={() => navigate(-1)}>
                        Voltar
                    </button>
                </div>
            </Layout>
        );
    }

    //  carregando
    if (!ticket) {
        return (
            <Layout ativo={"painel"}>
                <div className="p-5 text-center">
                    <div className="spinner-border text-dark" role="status"></div>
                    <p className="mt-2">Carregando dados da OS #{idOrdemServico}...</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout ativo={"painel"}>
            <div className="container-fluid p-4">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h1 className="titulo-principal" style={{ fontSize: '2rem', fontWeight: 'bold' }}>Imagens Anexadas</h1>
                        <p className="subtitulo-principal text-muted">Visualize as imagens anexadas na Ordem de Serviço</p>
                    </div>
                    <button 
                        className="btn btn-dark px-4 py-2" 
                        onClick={() => navigate(-1)}
                        style={{ borderRadius: '8px' }}
                    >
                        Voltar
                    </button>
                </div>

                {/* Card com dados da OS */}
                <div className="mb-4">
                    <OrdemServicoCard
                        placa={ticket.veiculo.placa}
                        marca={ticket.veiculo.marca}
                        prefixo={ticket.veiculo.prefixo}
                        modelo={ticket.veiculo.modelo}
                        cliente={ticket.veiculo.nome_cliente}
                        idOrdemServico={idOrdemServico}
                    />
                </div>

                {/* Filtros de Vistoria */}
                <div className="row mb-3">
                    <div className="col-6">
                        <button 
                            className={`btn w-100 py-2 ${filtroVistoria === "VISTORIA_INICIAL" ? "btn-light border shadow-sm" : "btn-outline-secondary"}`}
                            onClick={() => setFiltroVistoria("VISTORIA_INICIAL")}
                        >
                            Vistoria Inicial ({imageCounts.VISTORIA_INICIAL})
                        </button>
                    </div>
                    <div className="col-6">
                        <button 
                            className={`btn w-100 py-2 ${filtroVistoria === "VISTORIA_FINAL" ? "btn-light border shadow-sm" : "btn-outline-secondary"}`}
                            onClick={() => setFiltroVistoria("VISTORIA_FINAL")}
                        >
                            Vistoria Final ({imageCounts.VISTORIA_FINAL})
                        </button>
                    </div>
                </div>

                {/* Área de Upload */}
                <label 
                    className="upload-box d-flex flex-column align-items-center justify-content-center mb-5"
                    style={{ 
                        border: '2px dashed #ccc', 
                        borderRadius: '12px', 
                        height: '120px', 
                        backgroundColor: carregando ? '#f8f9fa' : '#fff',
                        cursor: carregando ? 'not-allowed' : 'pointer',
                        transition: '0.3s'
                    }}
                >
                    <input 
                        type="file" 
                        hidden 
                        onChange={handleFileUpload} 
                        accept="image/*"
                        disabled={carregando}
                    />
                    <i className={`bx ${carregando ? 'bx-loader-alt bx-spin' : 'bx-camera'}`} style={{ fontSize: '2.5rem', color: '#888' }}></i>
                    <span className="text-muted mt-2">
                        {carregando ? "Enviando arquivo..." : "Clique para anexar foto de Vistoria"}
                    </span>
                </label>

                {/* Galeria de Imagens */}
                <div className="row">
                    {imagens.length > 0 ? (
                        imagens.map((img) => (
                            <div className="col-12 col-md-6 col-lg-3 mb-4" key={img.id}>
                                <div className="card border-0 shadow-sm" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                    <div style={{ height: '180px', backgroundColor: '#e9ecef' }}>
                                        <img 
                                            src={img.url} 
                                            alt={img.nome}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="card-body bg-white">
                                        <h6 className="mb-1 fw-bold text-truncate">{img.nome || "Imagem Anexada"}</h6>
                                        <p className="text-muted small mb-3">
                                            Data: {img.dataCriacao ? new Date(img.dataCriacao).toLocaleDateString() : "---"}
                                        </p>
                                        <div className="d-flex gap-2">
                                            <button 
                                                className="btn btn-success btn-sm w-100 py-2"
                                                onClick={() => window.open(img.url, '_blank')}
                                            >
                                                Visualizar
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm w-100 py-2"
                                                onClick={() => handleDeleteImage(img.id )}
                                            >
                                                Excluir
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center py-5">
                            <p className="text-muted">Nenhuma imagem encontrada para esta Ordem de Serviço.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default ImagensAnexadas;
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../../components/Layout/Layout";
import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import ServicosEItensLogic from "../../../service/ServicosEItens.js"; // Importando a lógica real
import "../../ConfigLayoutWorkflow.css";

const API_URL = "http://localhost:8080/arquivos";

function ImagensAnexadas() {
    const { idOrdemServico } = useParams();
    const navigate = useNavigate();
    const { buscarOrdem } = ServicosEItensLogic(); // Hook de serviço
    
    // Estados do componente
    const [imagens, setImagens] = useState([]);
    const [carregando, setCarregando] = useState(false);
    const [filtroVistoria, setFiltroVistoria] = useState("inicial");
    const [ticket, setTicket] = useState(null); // Inicializa como null

    // 1. Buscar imagens anexadas
    const carregarImagens = async () => {
        try {
            const response = await axios.get(`${API_URL}/vistoria/${idOrdemServico}`);
            setImagens(response.data);
        } catch (error) {
            console.error("Erro ao buscar imagens:", error);
        }
    };

    // 2. Buscar dados da Ordem de Serviço (INTEGRADO)
    const carregarDadosOrdem = async () => {
        try {
            const dados = await buscarOrdem(idOrdemServico);
            // Seguindo a mesma estrutura da tela de orçamento
            setTicket({
                ...dados.busca_simples,
                servicos: dados.busca_simples.servicos || [],
                produtos: dados.busca_simples.produtos || []
            });
        } catch (e) {
            console.error("Erro ao carregar dados da OS:", e);
        }
    };

    useEffect(() => {
        if (idOrdemServico) {
            carregarImagens();
            carregarDadosOrdem();
        }
    }, [idOrdemServico]);

    // Lógica de Upload
    const handleFileUpload = async (event) => {
        const arquivoSelecionado = event.target.files[0];
        if (!arquivoSelecionado) return;

        const formData = new FormData();
        formData.append("file", arquivoSelecionado);

        setCarregando(true);
        try {
            const categoriaEnum = "ORDEM_SERVICO"; 
            await axios.post(
                `${API_URL}/vistoria/${idOrdemServico}/${categoriaEnum}`, 
                formData, 
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            alert("Imagem anexada com sucesso!");
            carregarImagens(); 
        } catch (error) {
            console.error("Erro no upload:", error);
            alert("Erro ao enviar imagem.");
        } finally {
            setCarregando(false);
            event.target.value = ""; 
        }
    };

    if (!ticket) return <Layout ativo={"painel"}><div className="p-4">Carregando dados...</div></Layout>;

    return (
        <Layout ativo={"painel"}>
            <div className="container-fluid p-4">
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
                        Voltar para Ordem de Serviço
                    </button>
                </div>

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

                {/* Filtros Visuais */}
                <div className="row mb-3">
                    <div className="col-6">
                        <button 
                            className={`btn w-100 py-2 ${filtroVistoria === "inicial" ? "btn-light border shadow-sm" : "btn-outline-secondary"}`}
                            onClick={() => setFiltroVistoria("inicial")}
                        >
                            Vistoria Inicial ({imagens.length})
                        </button>
                    </div>
                    <div className="col-6">
                        <button 
                            className={`btn w-100 py-2 ${filtroVistoria === "final" ? "btn-light border shadow-sm" : "btn-outline-secondary"}`}
                            onClick={() => setFiltroVistoria("final")}
                        >
                            Vistoria Final (0)
                        </button>
                    </div>
                </div>

                {/* Box de Upload */}
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

                {/* Listagem Dinâmica */}
                <div className="row">
                    {imagens.length > 0 ? (
                        imagens.map((img) => (
                            <div className="col-12 col-md-6 col-lg-3 mb-4" key={img.idArquivo}>
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
                                            <button className="btn btn-outline-danger btn-sm w-100 py-2" disabled>
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
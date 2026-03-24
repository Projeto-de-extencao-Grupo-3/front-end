import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Layout from "../../../components/Layout/Layout";
import InformacoesCard from "../../../components/ServicoCard/InformacoesCard";
import ItemContador from "../../../components/ServicoCard/ItemContador";
import StepperFluxo from "../../../components/StepperFluxo/StepperFluxo";
import OrdemServicoCard from "../../../components/ServicoCard/OrdemServicoCard";
import "./EntradaVeiculo.css";
import RegistroEntrada from "../../../service/RegistroEntrada";
import ReconhecimentoPlaca from "../../../service/ReconhecimentoPlaca";
import Swal from 'sweetalert2';
import Jornada from "../../../service/Jornada";

function EntradaVeiculoCamera() {

    const { adicionarRegistroEntrada } = Jornada()


    const [registroEntrada, setRegistroEntrada] = useState({
        dataEntrada: new Date().toISOString().split('T')[0], responsavel: "", cpfResponsavel: "",
        geladeira: 0, macaco: 0, extintor: 0, estepe: 0,
        chave_roda: 0, monitor: 0, caixa_ferramentas: 0, som_dvd: 0,
        observacoes: ""
    });

    const navigate = useNavigate();
    const location = useLocation();
    const inicializado = useRef(false);

    const { placa: placaDaUrl } = useParams();

    const [placa, setPlaca] = useState(placaDaUrl || '');
    const [marca, setMarca] = useState();
    const [modelo, setModelo] = useState();
    const [prefixo, setPrefixo] = useState();
    const [empresa, setEmpresa] = useState();
    const [idCliente, setIdCliente] = useState();
    const [idOrdemServico, setIdOrdemServico] = useState();

    const [_processado, setProcessado] = useState(false);

    const { reconhecerPlaca } = ReconhecimentoPlaca();
    const [veiculo, setVeiculo] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistroEntrada(prev => ({ ...prev, [name]: value }));
    };

    const handleCounterChange = (itemKey, novoValor) => {
        setRegistroEntrada(prev => ({ ...prev, [itemKey]: novoValor }));
    };

    const handleFinalizar = async () => {
        console.log("Objeto registroEntrada completo:", registroEntrada);
        try {
            const resposta = await adicionarRegistroEntrada({
                fk_veiculo: veiculo.id_veiculo,
                entrada: {
                    data_entrada_prevista: registroEntrada.dataEntrada,
                    data_entrada_efetiva: registroEntrada.dataEntrada,
                    responsavel: registroEntrada.responsavel,
                    cpf: registroEntrada.cpfResponsavel,
                    observacoes: registroEntrada.observacoes,
                    geladeira: Number(registroEntrada.geladeira),
                    macaco: Number(registroEntrada.macaco),
                    extintor: Number(registroEntrada.extintor),
                    estepe: Number(registroEntrada.estepe),
                    chave_roda: Number(registroEntrada.chave_roda),
                    monitor: Number(registroEntrada.monitor),
                    caixa_ferramentas: Number(registroEntrada.caixa_ferramentas),
                    som_dvd: Number(registroEntrada.som_dvd),
                    fk_cliente: idCliente,
                    fk_veiculo: veiculo.id_veiculo,
                    fk_ordem_servico: registroEntrada.fk_ordem_servico,
                    fk_oficina: 1
                }
            });
            const novoId = resposta.entrada?.fkOrdemServico || resposta.fk_ordem_servico;
            setIdOrdemServico(novoId);
            console.log("Resposta da API após adicionar registro de entrada:", resposta);
            console.log("Cadastro realizado com sucesso!");
            navigate(`/painelControle/orcamento/${placa}/${novoId}`, {
                state: {
                    idOrdemServico: novoId,
                    veiculoDados: {
                        marca,
                        prefixo,
                        modelo,
                        empresa,
                        placa
                    }
                }
            });
        } catch (error) {
            console.error("Erro no fluxo de entrada:", error);
            alert("Ocorreu um erro ao salvar os dados. Verifique o console.");
        }
    };
    async function send_to_gateway(arquivo) {
        Swal.fire({
            title: 'Reconhecendo Placa...',
            text: 'Aguarde enquanto processamos a imagem.',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {

            const dadosVeiculo = await reconhecerPlaca(arquivo);

            if (dadosVeiculo && dadosVeiculo.length > 0) {
                const principal = dadosVeiculo[0];

                setPlaca(principal.placa);
                setMarca(principal.marca);
                setModelo(principal.modelo);
                setPrefixo(principal.prefixo);
                setEmpresa(principal.nome_cliente);
                setIdCliente(principal.id_cliente);
                setVeiculo(principal);

                setProcessado(true);
                Swal.close();

                navigate(`/painelControle/entrada/${principal.placa}`, {
                    replace: true,
                    state: { veiculoCarregado: principal }
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Veículo encontrado!',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Veículo não cadastrado',
                    text: 'A placa reconhecida não foi encontrada no GROTRACK. Por favor, cadastre o veículo primeiro.',
                    confirmButtonText: 'Voltar ao Painel',
                    confirmButtonColor: '#d33',
                })
            }
        } catch (e) {
            console.log("Error: ", e)
            Swal.fire({
                icon: 'error',
                title: 'Veículo não cadastrado',
                text: 'A placa reconhecida não foi encontrada no Sistema GROTRACK. Por favor, cadastre o veículo primeiro.',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#d33',
            }).then(() => {
                navigate("/painelControle", { replace: true });
            });
        }
    }

    useEffect(() => {
        // 1. Prioridade: Veio do Painel de Controle (Botão "Fazer Entrada")
        if (location.state?.dadosOS) {
            const os = location.state.dadosOS;

            // Preenche os dados básicos do cabeçalho
            setMarca(os.veiculo?.marca || "");
            setModelo(os.veiculo?.modelo || "");
            setPrefixo(os.veiculo?.prefixo || "");
            setEmpresa(os.cliente?.nome || "");
            setIdCliente(os.cliente?.id_cliente);
            setVeiculo(os.veiculo);
            setIdOrdemServico(os.fk_ordem_servico);

            setRegistroEntrada(prev => ({
                ...prev,
                fk_ordem_servico: os.fk_ordem_servico
            }));

            return; // Interrompe aqui, não precisa rodar o reconhecimento de imagem
        }

        // 2. Segunda opção: Veio da Câmera (Reconhecimento de Placa)
        if (location.state?.arquivoCapturado && !inicializado.current) {
            inicializado.current = true;
            const arquivo = location.state.arquivoCapturado;

            navigate(location.pathname, { replace: true, state: {} });

            send_to_gateway(arquivo);
        }
    }, [location.state, navigate]);

    const mapaItens = [
        { label: "Geladeira", key: "geladeira" },
        { label: "Chave de Roda", key: "chave_roda" },
        { label: "Macaco", key: "macaco" },
        { label: "TV/Monitor", key: "monitor" },
        { label: "Extintor", key: "extintor" },
        { label: "Caixa de Ferramentas", key: "caixa_ferramentas" },
        { label: "Estepe", key: "estepe" },
        { label: "Som/DVD", key: "som_dvd" }
    ];

    return (
        <Layout ativo={"painel"}>
            <div>
                <h1>Entrada de Veículo</h1>
                <p>Visão geral da situação da sua oficina</p>
            </div>
            <StepperFluxo
                etapas={[
                    { id: "entrada", label: "Entrada", icon: "bx bx-file", status: "concluido" },
                    { id: "orcamento", label: "Aguardando Orçamento", icon: "bx bx-time", status: "ativo" },
                    { id: "autorizacao", label: "Aguardando Autorização", icon: "bx bx-lock", status: "pendente" },
                    { id: "autorizado", label: "Autorizado", icon: "bx bx-check", status: "pendente" },
                    { id: "vaga", label: "Aguardando Vaga", icon: "bx bx-car", status: "pendente" },
                    { id: "producao", label: "Produção", icon: "bx bx-cog", status: "pendente" },
                    { id: "finalizado", label: "Finalizado", icon: "bx bx-check-circle", status: "pendente" },
                ]}
            />
            <div>
                <OrdemServicoCard
                    marca={marca}
                    prefixo={prefixo}
                    modelo={modelo}
                    cliente={empresa}
                    idOrdemServico={idOrdemServico}
                    placa={placa} />
            </div>
            <div className="section1">
                <InformacoesCard titulo="Informações do Veículo" icone="bx bx-bus">
                    <div className="itens-grid">
                        {mapaItens.map(item => (
                            <ItemContador
                                key={item.key}
                                label={item.label}
                                valor={registroEntrada[item.key]}
                                setValor={(novo) => handleCounterChange(item.key, novo)}
                            />
                        ))}
                    </div>

                    <div className="observacoes-section">
                        <label>Observações/Itens adicionais</label>
                        <input name="observacoes" value={registroEntrada.observacoes} onChange={handleChange} placeholder="Detalhes extras..." />
                    </div>
                </InformacoesCard>

                <InformacoesCard titulo="Detalhes de Entrada" icone="bx bx-paste">
                    <div className="input-field">
                        <label>Data de Entrada*</label>
                        <input type="date" name="dataEntrada" value={registroEntrada.dataEntrada} onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label>Nome do responsável*</label>
                        <input name="responsavel" value={registroEntrada.responsavel} onChange={handleChange} placeholder="Ex: João da Silva" />
                    </div>
                    <div className="input-field">
                        <label>CPF do responsável*</label>
                        <input name="cpfResponsavel" value={registroEntrada.cpfResponsavel} onChange={handleChange} placeholder="Ex: 123.456.789-00" />
                    </div>
                </InformacoesCard>
            </div>
            <div className="section-buttom">
                <button className="btn-secundario" onClick={() => navigate("/painelControle")}>Voltar para o painel</button>
                <button className="btn-primario" onClick={handleFinalizar}>Finalizar entrada</button>
            </div>

        </Layout >
    );
}

export default EntradaVeiculoCamera;
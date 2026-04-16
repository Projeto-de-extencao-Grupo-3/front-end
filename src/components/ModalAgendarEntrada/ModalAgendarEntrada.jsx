import { useState } from "react";
import './ModalAgendarEntrada.css';
import api from "../../service/api";

function ModalAgendarEntrada({ isOpen, onClose, onAgendamentoSuccess }) {
    const [etapa, setEtapa] = useState("pesquisa");
    const [placa, setPlaca] = useState("");
    const [dataAgendamento, setDataAgendamento] = useState("");
 
    const handlePlacaChange = (e) => {
        setPlaca(e.target.value);
    };

    const [cliente, setCliente] = useState({
        cpf_cnpj: "",
        email: "",
        id_cliente: null, 
        id_endereco: null,
        id_oficina: null,
        nome: "",
        telefone: "",
        tipo_cliente: "",
        veiculo: {
            ano_modelo: "",
            id_veiculo: null,
            marca: "",
            modelo: "",
            placa: "",
            prefixo: ""

        }
    });

    const handlePesquisar = async (placa) => {
        var response = await api.get(`/clientes/placa/${placa}`)
            .catch(error => {
                alert("Veículo não encontrado. Verifique a placa e tente novamente.", error);
                return;
            });

        console.log("Resposta da API:", response);

        if (response.status === 200) {
            setCliente(response.data);
            setEtapa("detalhes");
        }
    };

    const handleCancelar = () => {
        setEtapa("pesquisa"); //dps de fechar o modal volta pra etapa de pesquisa
        onClose();
    };

    const handleAgendar = (data) => async () => {
        const response = await api.post("/jornada/agendamento", {
            data_entrada_prevista: data,
            fk_veiculo: cliente.veiculo.id_veiculo
        })
        .catch(error => {
            if (error.response?.status === 422) {
                alert("Este veículo já está no Painel de Controle, não é possível agendar entrada.");
            } else {
                alert("Erro ao agendar entrada. Tente novamente. " + (error.response?.data?.message || error.message));
            }
        });

        if (response.status === 201) {
            alert("Entrada agendada com sucesso!");
            if (onAgendamentoSuccess) {
                onAgendamentoSuccess();
            }
            onClose();
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="modal-backdrop fade show"
                    onClick={onClose}
                    style={{ zIndex: 1040 }}
                />
            )}

            <div className={`modal fade ${isOpen ? "show d-block" : ""}`} style={{ zIndex: 1050 }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-entrada">

                        <div className="modal-header border-0">
                            <h2 className="modal-title fw-bold titulo-modal">
                                Agendamento de Entrada de Veículo
                            </h2>
                            <button className="btn-close" onClick={handleCancelar}></button>
                        </div>

                        <div className="modal-body">
                            {/* etapa 1 - pesquisar */}
                            {etapa === "pesquisa" && (
                                <>
                                    <label className="form-label fw-semibold">Placa do Veículo*</label>
                                    <input
                                        type="text"
                                        className="form-control input-placa mb-3"
                                        placeholder="Informe a placa (Ex: FUB-5296)"
                                        onChange={handlePlacaChange}
                                    />

                                    <button
                                        className="btn btn-primary w-100 botao-pesquisar mb-3"
                                        onClick={() => handlePesquisar(placa)}
                                    >
                                        Pesquisar
                                    </button>
                                </>
                            )}

                            {/* etapa 2 - detalhe do veiculo */}
                            {etapa === "detalhes" && (
                                <>
                                    <div className="info-veiculo-card p-3 mb-3">
                                        <div className="d-flex align-items-start gap-3">

                                            <i className="bx bxs-user user-icon"></i>

                                            <div className="flex-grow-1">
                                                <div className="linha-superior">
                                                    <strong>Cliente:</strong> {cliente.nome}
                                                </div>

                                                <div className="linha-inferior">
                                                    {cliente.veiculo.modelo} - {cliente.veiculo.prefixo} &nbsp; <strong>Placa:</strong> {cliente.veiculo.placa}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <label className="form-label fw-semibold">Data de Agendamento*</label>
                                    <input
                                        type="date"
                                        className="form-control mb-4"
                                        onChange={(e) => setDataAgendamento(e.target.value)}
                                    />

                                    <div className="d-flex gap-3">
                                        <button className="btn btn-success w-50" onClick={handleAgendar(dataAgendamento)}>
                                            ✓ Agendar
                                        </button>

                                        <button className="btn btn-outline-dark w-50" onClick={handleCancelar}>
                                            Cancelar
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalAgendarEntrada;

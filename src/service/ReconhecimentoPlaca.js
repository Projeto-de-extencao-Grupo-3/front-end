import api from "./api"; 
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

function ReconhecimentoPlaca() {
    const navigate = useNavigate();
    const reconhecerPlaca = async (arquivo) => {
        // 1. Validar se o arquivo existe
        if (!(arquivo instanceof File)) {
            console.error("O objeto passado não é um arquivo válido.");
            return null;
        }

        const formData = new FormData();
        formData.append('file', arquivo); // A chave DEVE ser 'file'

        try {
            const response = await api.post("/plates", formData); 
            return response.data; 
        } catch (error) {
            console.error("Erro na chamada ao Gateway Spring:", error.response?.data || error.message);
            throw error;
        }
    }

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

                Swal.close();

                navigate(`/painelControle/entrada/${principal.placa}`, {
                    replace: true
                });

                Swal.fire({
                    icon: 'success',
                    title: 'Veículo encontrado!',
                })

                navigate(`/painelControle/entrada/${principal.placa}`, {
                    replace: true
                });
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

    return { reconhecerPlaca, send_to_gateway }

}


export default ReconhecimentoPlaca;
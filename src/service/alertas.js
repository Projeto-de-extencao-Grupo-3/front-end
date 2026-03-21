import Swal from 'sweetalert2';

export const exibirAlertaSucesso = (mensagem) => {
    Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: mensagem,
        timer: 2000,
        showConfirmButton: false
    });
};

export const exibirAlertaErro = (mensagem) => {
    Swal.fire({
        icon: 'error',
        title: 'Erro!',
        timer: 3000,
        text: mensagem,
    });
};

export const exibirAlertaConfirmacao = (mensagem, confirmButtonText, cancelButtonText) => {
    return Swal.fire({
        title: 'Você tem certeza?',
        text: mensagem,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText || 'Sim, pode continuar!',
        cancelButtonText: cancelButtonText || 'Cancelar'
    });
};

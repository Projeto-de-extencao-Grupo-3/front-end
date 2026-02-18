useEffect(() => {
    const carregarDados = async () => {
        try {
            const response = await api.get("/ordens");
            setServicos(response.data);
        } catch (error) {
            console.error("Erro ao buscar serviços:", error);
            if (error.response && error.response.status === 401) {
                // Opcional: Redirecionar para o login se o token expirar
                navigate("/");
            }
        }
    };

    carregarDados();
}, [navigate]);
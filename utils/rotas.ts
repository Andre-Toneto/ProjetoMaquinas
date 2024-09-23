interface Rotas {
    nome: string;
    path: string;
}

export default () => {
    const rotas: Rotas[] = [
        { nome: "Home", path: "/" },
        { nome: "infoMaq", path: "/infoMaq" },
        { nome: "Sobre", path: "/sobre" },
    ];
    return rotas;
}
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "./styles/Home.module.css";

const Home = () => {
  const [esmaltes, setEsmaltes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("");

  // Função para buscar esmaltes no servidor
  const fetchEsmaltes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/objetos");
      const data = await response.json();
      setEsmaltes(data);
    } catch (error) {
      console.error("Erro ao buscar esmaltes:", error);
      alert("Erro ao buscar dados do servidor!");
    } finally {
      setLoading(false);
    }
  };

  // Remove esmalte do servidor
  const removerEsmalte = async (id) => {
    try {
      await fetch(`http://localhost:5000/objetos/${id}`, { method: "DELETE" });
      fetchEsmaltes();
    } catch (error) {
      console.error("Erro ao remover esmalte:", error);
    }
  };

  // Ordenações
  const orderAz = () => {
    const listaOrdenada = [...esmaltes].sort((a, b) => a.nome.localeCompare(b.nome));
    setEsmaltes(listaOrdenada);
  };

  const orderZa = () => {
    const listaOrdenada = [...esmaltes].sort((a, b) => b.nome.localeCompare(a.nome));
    setEsmaltes(listaOrdenada);
  };

  const orderPriceAsc = () => {
    const listaOrdenada = [...esmaltes].sort((a, b) => a.preco - b.preco);
    setEsmaltes(listaOrdenada);
  };

  const orderPriceDesc = () => {
    const listaOrdenada = [...esmaltes].sort((a, b) => b.preco - a.preco);
    setEsmaltes(listaOrdenada);
  };

  // Geração de PDF
  const gerarPDF = () => {
    const doc = new jsPDF();
    doc.text("Lista de Esmaltes", 10, 10);
    doc.autoTable({
      head: [["Nome", "Descrição", "Cor", "Preço", "Quantidade", "Marca"]],
      body: esmaltes.map((esm) => [
        esm.nome,
        esm.descricao,
        esm.cor,
        esm.preco,
        esm.quantidade,
        esm.marca,
      ]),
    });
    doc.save("esmaltes.pdf");
  };

  useEffect(() => {
    fetchEsmaltes();
  }, []);

  const esmaltesFiltrados = esmaltes.filter((esm) =>
    esm.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="home">
      <header>
        <h1>★ Gerenciador de Esmaltes ★</h1>
        <nav>
          <Link to="/registro">Cadastrar Novo Esmalte</Link>
        </nav>
      </header>

      <div className="filtro">
        <input
          type="text"
          placeholder="Buscar esmalte..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <button onClick={orderAz}>Ordenar A-Z</button>
        <button onClick={orderZa}>Ordenar Z-A</button>
        <button onClick={orderPriceAsc}>Preço: Menor para Maior</button>
        <button onClick={orderPriceDesc}>Preço: Maior para Menor</button>
        <button onClick={gerarPDF}>Gerar PDF</button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : esmaltesFiltrados.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Cor</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Marca</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {esmaltesFiltrados.map((esm) => (
              <tr key={esm.id}>
                <td>{esm.nome}</td>
                <td>{esm.descricao}</td>
                <td>{esm.cor}</td>
                <td>{esm.preco}</td>
                <td>{esm.quantidade}</td>
                <td>{esm.marca}</td>
                <td>
                  <Link to={`/alterar/${esm.id}`}>Editar</Link>
                  <button onClick={() => removerEsmalte(esm.id)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum esmalte encontrado</p>
      )}
    </div>
  );
};

export default Home;

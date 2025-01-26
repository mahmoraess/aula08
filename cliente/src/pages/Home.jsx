import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import styles from "../styles/Home.module.css";

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
    <div className={styles.container}>
      <header>
        <h1 className={styles.title}>★ Gerenciador de Esmaltes ★</h1>
        <nav>
          <Link to="/registro" className={`${styles.button} ${styles.cadastrar}`}>Cadastrar Novo Esmalte</Link>
        </nav>
      </header>

      <div className={styles.filtro}>
        <input
          type="text"
          placeholder="Buscar esmalte..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className={styles.input}
        />
        <button onClick={orderAz} className={styles.button}>Ordenar A-Z</button>
        <button onClick={orderZa} className={styles.button}>Ordenar Z-A</button>
        <button onClick={orderPriceAsc} className={styles.button}>Preço: Menor para Maior</button>
        <button onClick={orderPriceDesc} className={styles.button}>Preço: Maior para Menor</button>
        <button onClick={gerarPDF} className={styles.button}>Gerar PDF</button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : esmaltesFiltrados.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Nome</th>
              <th className={styles.th}>Descrição</th>
              <th className={styles.th}>Cor</th>
              <th className={styles.th}>Preço</th>
              <th className={styles.th}>Quantidade</th>
              <th className={styles.th}>Marca</th>
              <th className={styles.th}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {esmaltesFiltrados.map((esm) => (
              <tr key={esm.id} className="tr">
                <td className={styles.td}>{esm.nome}</td>
                <td className={styles.td}>{esm.descricao}</td>
                <td className={styles.td}>{esm.cor}</td>
                <td className={styles.td}>{esm.preco}</td>
                <td className={styles.td}>{esm.quantidade}</td>
                <td className={styles.td}>{esm.marca}</td>
                <td>
                  <Link to={`/alterar/${esm.id}`} className={`${styles.link} ${styles.edit}`}>Editar</Link>
                  <button onClick={() => removerEsmalte(esm.id)} className={`${styles.button} ${styles.remove}`}>Remover</button>
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

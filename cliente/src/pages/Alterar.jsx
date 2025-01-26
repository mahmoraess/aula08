import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/Form.module.css";

export default function AlterarEsmalte() {
  const { id } = useParams(); // ID do esmalte
  const [esmalte, setEsmalte] = useState({
    nome: "",
    descricao: "",
    cor: "",
    preco: "",
    quantidade: "",
    marca: "",
  });

  const navigation = useNavigate();

  // Buscar os dados do esmalte pelo ID
  useEffect(() => {
    const fetchEsmalte = async () => {
      try {
        const resposta = await fetch(`http://localhost:5000/objetos`);
        if (!resposta.ok) {
          throw new Error("Erro ao buscar esmalte");
        }
        const dados = await resposta.json();
        const esmalte = dados.filter((esm) => esm.id == id);
        setEsmalte(esmalte[0]);
      } catch (error) {
        console.error("Erro ao buscar esmalte:", error);
        alert("Erro ao buscar esmalte");
      }
    };
    fetchEsmalte();
  }, [id]);

  // Função para alterar os dados do esmalte
  const alterar = async (event) => {
    event.preventDefault();
    try {
      await fetch(`http://localhost:5000/objetos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(esmalte),
      });
      alert("Esmalte alterado com sucesso!");
      navigation("/");
    } catch (error) {
      console.error("Erro ao alterar esmalte:", error);
      alert("Erro ao alterar");
    }
  };

  // Atualizar o estado do esmalte ao alterar os inputs
  const handleChange = (evento) => {
    const { name, value } = evento.target;
    setEsmalte({ ...esmalte, [name]: value });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={alterar} className={styles.form}>
        <h2 className={styles.title}>Editar Esmalte</h2>
        <input
          className={styles.input}
          type="text"
          name="nome"
          value={esmalte.nome}
          onChange={handleChange}
          placeholder="Nome do esmalte"
        />
        <input
          className={styles.input}
          type="text"
          name="descricao"
          value={esmalte.descricao}
          onChange={handleChange}
          placeholder="Descrição"
        />
        <input
          className={styles.input}
          type="text"
          name="cor"
          value={esmalte.cor}
          onChange={handleChange}
          placeholder="Cor"
        />
        <input
          className={styles.input}
          type="number"
          name="preco"
          value={esmalte.preco}
          onChange={handleChange}
          placeholder="Preço"
        />
        <input
          className={styles.input}
          type="number"
          name="quantidade"
          value={esmalte.quantidade}
          onChange={handleChange}
          placeholder="Quantidade"
        />
        <input
          className={styles.input}
          type="text"
          name="marca"
          value={esmalte.marca}
          onChange={handleChange}
          placeholder="Marca"
        />
        <button className={styles.button} type="submit">
          Alterar
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Form.module.css";

const Registro = () => {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    cor: "",
    preco: "",
    quantidade: "",
    marca: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/objetos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      navigate("/");
    } catch (error) {
      console.error("Erro ao cadastrar esmalte:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Cadastrar Esmalte</h2>
        <input
          className={styles.input}
          name="nome"
          placeholder="Nome"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="descricao"
          placeholder="Descrição"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="cor"
          placeholder="Cor"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="preco"
          type="number"
          placeholder="Preço"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="quantidade"
          type="number"
          placeholder="Quantidade"
          onChange={handleChange}
          required
        />
        <input
          className={styles.input}
          name="marca"
          placeholder="Marca"
          onChange={handleChange}
          required
        />
        <button className={styles.button} type="submit">
          Cadastrar
        </button>
      </form>
    </div>
  );
};

export default Registro;

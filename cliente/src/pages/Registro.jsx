import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <h2>Cadastrar Esmalte</h2>
      <input name="nome" placeholder="Nome" onChange={handleChange} required />
      <input name="descricao" placeholder="Descrição" onChange={handleChange} required />
      <input name="cor" placeholder="Cor" onChange={handleChange} required />
      <input name="preco" type="number" placeholder="Preço" onChange={handleChange} required />
      <input name="quantidade" type="number" placeholder="Quantidade" onChange={handleChange} required />
      <input name="marca" placeholder="Marca" onChange={handleChange} required />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Registro;

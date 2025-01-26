import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Alterar() {

    const { id } = useParams();

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const navigation = useNavigate();

    useEffect(() => {
    const fetchUsuarios = async () => {
        const resposta = await fetch('http://localhost:3000/usuarios');
        const dados = await resposta.json();
        setUsuarios(dados);
    };
    fetchUsuarios();
}, []);

    const alterar = async(event) => {
        event.preventDefault();
        try{
            await fetch('http://localhost:3000/usuarios/'+ id, 
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'Application/json'},
                    body: JSON.stringify({
                        nome: nome,
                        email: email
                    })
                }
            );
            navigation('/');
        }catch{
            alert('Erro ao alterar');
        }
    }
    return (
        <form onSubmit={alterar}>
            <input type="text" value={nome} onChange={(evento)=> setNome(evento.target.value)}/>
            <input type="text" value={email}onChange={(evento)=> setEmail(evento.target.value)}/>
            <button>Alterar</button>
        </form>
    );

    
}
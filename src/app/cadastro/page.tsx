"use client"
import React, { useContext, useState } from 'react'
import '@/styles/global-styled'
import perfil_logo from '@/assets/login/icone_login.png'
import btn_seta from '@/assets/login/btn_right.png'
import logo_certa from '@/assets/logo_certa.png'
import { DivCadastro, DivCadastroDir, DivCadastroEsq } from '@/styles/styled'
import Image from 'next/image'
import { CadastroProps } from '@/types'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AuthContext } from '@/context'


export default function Cadastro() {

	const navigate = useRouter()
	const { loginContext } = useContext(AuthContext);

	// const [usuario, setUsuario] = useState<UsuarioProps>(
	// 	{
	// 		"cep": "",
	// 		"data_nascimento": "" ,
	// 		"data_registro": "",
	// 		"email": "string",
	// 		"id_usuario": 0,
	// 		"nick_name": "",
	// 		"nome": "",
	// 		"porc_atual": 0,
	// 		"quant_pontos": 0,
	// 		"senha": "",
	// 	}
	// )
	
	const [cadastro, setCadastro] = useState<CadastroProps>(
		{
			"cep": "",
			"data_nascimento": "",
			"email": "",
			"nick_name": "",
			"nome": "",
			"senha": ""
		}
	)
	
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setCadastro({...cadastro, [name]:value})
	}
	

	const [error, setError] = useState<string | null>(null)


	const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
		e.preventDefault()

		const cabecalho = {
			method: 'POST',
			headers: {"Content-Type" : "application/json"},
			body: JSON.stringify(cadastro),
		}
		console.log(cadastro)

		try{
			const response = await fetch("http://localhost:8080/usuarioresource/cadastroUsuario", cabecalho)
			if (response.ok){
				const response2 = await fetch(`http://localhost:8080/usuarioresource/exibirUsuarioCompleto/${cadastro.email}`);
				const response3 = await fetch("http://localhost:8080/rankingresource/inserirRanking")
				if (response2.ok && response3.ok) {
					const idUsuario = await response2.json();
					  const user = {
						id_usuario: idUsuario,
						email: cadastro.email,
						nome: cadastro.nome,
					  };
					  alert("Cadastro realizado com sucesso!")
					  loginContext(user); // Atualiza o contexto com os dados do usuário
					  navigate.push("/login")
					}
				
			}else{
				const error = await response.json()
				const message = error.message
				setError(message)
		   	}
		} catch(error){
			console.error("Erro ao realizar cadastro", error);
			setError("Erro ao conectar com o servidor.");
	   	}
	} 



	return (
	<DivCadastro>
		
		<DivCadastroEsq>
			<div className='logo'>
				<Link href={"/"}>
					<Image src={logo_certa} alt='Logo Lumiere'/>
				</Link>
			</div>
			<Image src={perfil_logo} alt='Ícone de uma mulher em estilo cartoon' className='image'/>
			<h2>Cadastre-se</h2>
			<p>Junte-se à Lumière, economize energia e ganhe recompensas por um futuro sustentável!</p>
			<Image src={btn_seta} alt='Botão de um círculo com uma seta para direita'/>
		</DivCadastroEsq>
		<DivCadastroDir>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="idEmail">E-mail:</label>
					<input type="email" name="email" id="idEmail" placeholder='exemplo@domain.com' onChange={handleChangeInput}/>
				</div>
				<div>
					<label htmlFor="idsenha">Senha:</label>
					<input type="password" name="senha" id="idSenha" placeholder='Máximo 10 caracteres' onChange={handleChangeInput}/>
				</div>
				<div>
					<label htmlFor="idNick">NickName:</label>
					<input type="text" name="nick_name" id="idNick" placeholder='Digite um nickname' onChange={handleChangeInput}/>
				</div>
				<div>
					<label htmlFor="idNasc">Data Nascimento:</label>
					<input type="date" name="data_nascimento" id="idNasc" placeholder='xx/xx/xxxx' onChange={handleChangeInput}/>
				</div>
				<div>
					<label htmlFor="idCep">CEP:</label>
					<input type="text" name="cep" id="idCep" placeholder='12345-678' onChange={handleChangeInput}/>
				</div>
				<div>
					<label htmlFor="idNome">Nome Completo:</label>
					<input type="text" name="nome" id="idNome" placeholder='Fulano da Silva' onChange={handleChangeInput}/>
				</div>

				<div>
					<input type="checkbox" name="aceitarTermos" id="idTermos" />
					<label htmlFor="idTermos">Eu li, e aceito os termos de uso</label>
				</div>

				<button type='submit'>
					Cadastrar
				</button>
				{error && <p className='texto_erro' style={{color: "red"}}>{error}</p>}
			</form>
		</DivCadastroDir>
	</DivCadastro>
  )
}

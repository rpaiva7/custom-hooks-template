
import React from 'react';
import { BASE_URL } from './constants/constants';
import { Title, NameContainer, PostContainer } from './style'
import { GlobalStyle } from './GlobalStyle'
import { Header } from './components/Header/Header'
import { Card } from './components/Card/Card';
//import UseCapturarNome from './hooks/useCapturarNome';
//import useCapturarPostagem from './hooks/useCapturarPostagem';
import { useRequestData } from './hooks/useRequestData';
//import Router from "./routes/Router";
import { BASE_URL_HP } from './constants/constants';

function App() {

  //const nomeUsuarios = UseCapturarNome()
  //const postagens = useCapturarPostagem()
  const [nomeUsuarios, isLoadingUsuario, errorUsuario] = useRequestData(`${BASE_URL}users`)
  const [postagens] = useRequestData(`${BASE_URL}comments`)

  const [personagens] = useRequestData(`${BASE_URL_HP}/characters`)

 return(
    <div>
    <GlobalStyle />
    <Header /> 
    <Title>Nomes dos usuários</Title>
    <NameContainer>
      
      {isLoadingUsuario?<h1>Carregando...</h1>:nomeUsuarios.map((usuario) => {
        return(
        <Card 
        key={usuario.id} 
        text={usuario.name} 
        backgroudColor={'none'}
        textColor={'none'}
        />)
      })}
      {errorUsuario && <hi>ERRO NA REQUISIÇÃO</hi>}
    </NameContainer>

    <hr />
    <Title>Comentários dos usuários</Title>
    <PostContainer>

    {postagens.map((post) => {
      //console.log(post);
      return(
        <Card 
        key={post.id} 
        text={post.body} 
        backgroudColor={'#1dc690'}
        textColor={'#ffffff'}
        />)
    })}
    </PostContainer>

    <hr/>
    <h3>Exercício 3</h3>
    {personagens.map((personagem) =>{
      return  <p key={personagem.name}> {personagem.name}</p>
    })}
  </div>
);
}

console.log("App",App);

export default App;


/* Customização de hook: useRequestData 

Imagine uma padaria movimentada, onde os clientes pedem café regularmente. O atendente precisa preparar o café manualmente para cada pedido. Nesse processo, ele precisa reunir os ingredientes necessários, como café moído e água quente. Ele mede a quantidade correta de café, aquece a água até a temperatura adequada e, em seguida, despeja a água sobre o café para extrair o sabor. Esse processo requer atenção aos detalhes e várias etapas sequenciais.

Em um belo dia,  a gerente percebeu que a padaria precisaria de mais agilidade, então comprou uma cafeteira automática para a padaria, a preparação do café ficou significativamente mais rápida. O atendente pode simplesmente pressionar um botão e a cafeteira cuidará automaticamente de aquecer a água na temperatura correta, extrair o café e despejá-lo na jarra. Isso permite que o atendente atenda mais pedidos de café em um curto período de tempo, aumentando a eficiência e a velocidade do serviço.

Nessa analogia, os custom hooks em React podem ser comparados à cafeteira automática. Assim como a cafeteira simplifica e acelera a preparação do café, os custom hooks permitem que os desenvolvedores agilizem o processo de desenvolvimento, reutilizando lógica pré-configurada. Eles ajudam a evitar a repetição de código e permitem que os desenvolvedores criem componentes mais rapidamente, aumentando a eficiência e a velocidade de desenvolvimento.

# Motivação do Custom Hooks

- O React vem com vários Hooks prontos, mas às vezes gostaríamos que existisse um com um propósito mais específico (por exemplo: buscar dados).
- Nestes casos, podemos criar nossos próprios Hooks personalizados! (Conhecidos como Custom Hooks)

Custom hooks em React são uma forma de reutilizar código em diferentes partes de um projeto, evitando duplicação e tornando o código mais legível e fácil de manter. Eles permitem compartilhar lógica complexa entre componentes funcionais, promovem a consistência e podem ser facilmente compartilhados e reutilizados em diferentes projetos, economizando tempo e acelerando o desenvolvimento.

Dicas

- O nome do hook deve começar com use seguido de uma letra maiúscula para ficar claro que é um hook e que as [regras dos hooks](https://www.notion.so/8c1423d9b495467daacc1edb0faef959?pvs=21) devem ser seguidas (assim como o useState ou o useEffect, por exemplo).
- Deve ser utilizado da mesma forma que os hooks tradicionais, seguindo as mesmas regras.
- Alguns cenários para criar um custom hook incluem:
    - Código/lógica repetida;
    - Componente muito complexo ou longo;
    - Mesmos critérios usados para criar componentes ou funções.


Qual a diferença entre componentes e custom hooks?

Componentes são a base do React e são usados para construir a interface do usuário. Eles são responsáveis pela renderização e pelo gerenciamento de estado. Aqui estão algumas situações em que é apropriado usar componentes:

1. Construção da interface do usuário
2. Layout repetido
3. Criação de estado interno
4. Controle de ciclo de vida

Por outro lado, os hooks são a maneira recomendada de compartilhar lógica entre componentes funcionais. Eles fornecem uma forma mais flexível e eficiente de reutilizar código. Aqui estão algumas situações em que é apropriado usar hooks:

1. Reutilização de lógica: Se você possui lógica que é usada por vários componentes funcionais, como chamadas de API, manipulação de formulários, gerenciamento de estado compartilhado, entre outros, é recomendado extrair essa lógica para um hook personalizado. 
2. Composição de lógica:** Os hooks permitem que você componha diferentes hooks para criar lógica mais complexa. 
3. **Simplificação do código**: Os hooks podem tornar o código mais limpo e declarativo, especialmente quando se trata de lidar com efeitos colaterais e código assíncrono.

# Reutilização de lógicas de estado e lifecycle

- Podemos reutilizar toda a lógica de estado (funções, métodos, variáveis) e lifecycle (useEffect)
- Ou seja: componentes que têm comportamentos semelhantes, mas interfaces diferentes, podem reutilizar lógicas de estado.
- Os dois componentes têm coisas em comum:
    - Um estado com uma propriedade
    - Um useEffect() com uma requisição
    - Estado atualizado com resposta da requisição

## 1. Exemplo de hook de requisição

É possível extrair essa lógica para outra função:

import React, {useState, useEffect} from 'react' 
import axios from 'axios'

export function TelaProdutos() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios.get('https://minha-api.com/products')
			.then(response => {
				setProducts(response.data)
		})
			.catch(error => console.log(error.response.data))
	}, [])

return (
	<div>
		{products.map(product => {
			return <p>{product.name}</p>
		})}
	</div>
	)
}

## 2. Separando lógica

Uma função separada é criada, chamada use Products

Ela contém a mesma lógica que o componente

E retorna o array de produtos, pois, de todo esse código, é o que realmente é usado para a renderização:

import React, {useState, useEffect} from 'react' 
import axios from 'axios'

export function useProducts() {
	const [products, setProducts] = useState([])

	useEffect(() => {
		axios.get('https://minha-api.com/products')
			.then(response => {
				setProducts(response.data)
		})
			.catch(error => console.log(error.response.data)
	}, [])

return products
}

## 3. Usando lógica extraída

Substituímos toda aquela lógica pela chamada da função useProducts

E, se ela estiver em outro arquivo, devemos importá-la da mesma forma que fazemos com componentes:

import {useProducts} from './useProducts'

export function TelaProdutos() {
	const products = useProducts()

return (
	<div>
		{products.map(product => {
			return <p>{product.name}</p>
		})}
	</div>
	)
}

# Reutilizável como?

Podemos unir as duas funções em uma só, e chamá-las dos dois componentes, apenas variando os parâmetros

Código comum é mantido

Código variável é passado por parâmetro da função

Código arbitrário é deixado mais genérico

	import React, {useState, useEffect} from 'react' 
	import axios from 'axios'
	
	export function useRequestData(url, initialState) {
		const [data, setData] = useState(initialState)
	
		useEffect(() => {
			axios.get(url)
				.then(response => {
					setData(response.data)
			})
				.catch(error => console.log(error.response.data)
		)}, [url])
	
	return data
	}

## E utilizamos nos componentes

O mesmo hook, enviando argumentos diferentes:

import React from 'react''
iimport { BASE_URL } from '../constants/urls'
import { useRequestData } from './useRequestData'

export function TelaProdutos() {
	const products = useRequestData(`${BASE_URL}/products`, [])

return (
	<div>
		{products.map(product => {
			return <p>{product.name}</p>
		})}
	</div>
	)
}

import React from 'react''
iimport { BASE_URL } from '../constants/urls'
import { useRequestData } from './useRequestData'

export function TelaUsuario() {
	const user = useRequestData(`${BASE_URL}/user`, {})

return (
	<div>
		<p>{user.name}</p>
	</div>
	)
}

# Resumo

1. Custom Hooks é uma maneira de escrever código em React que pode ser reutilizado em diferentes partes de um projeto sem precisar reescrever o mesmo código várias vezes.
2. O nome do hook deve começar com use seguido de uma letra maiúscula.
3. Alguns cenários para criar um custom hook incluem: Código/lógica repetida, Componente muito complexo ou longo, 
4. É possível reutilizar toda a lógica de estado e lifecycle em diferentes componentes.
5. Podemos extrair a lógica para uma função separada e, em seguida, chamá-la a partir de diferentes componentes, enviando argumentos diferentes.


# Loading e tratamento de erros

# Loading

Os Loadings é uma forma de mostrar ao usuário que algum processo está sendo executado em segundo plano, como uma requisição de dados ou a execução de uma ação que pode levar algum tempo para ser concluída. São úteis porque ajudam a melhorar a experiência do usuário, deixando claro que algo está acontecendo e que não há problemas com o aplicativo.

Além disso, os Loadings podem ser usados para prevenir que o usuário interaja com o aplicativo antes de um processo estar completamente finalizado, evitando assim ações desnecessárias ou erros que possam ocorrer durante o processo. 

## Tratamento de Erros

- Até este momento do curso, nós estávamos fazendo nossos loadings com renderização condicional
- Porém, quando acontece um erro ou quando, por exemplo, nos é retornada uma lista vazia, nosso programa não sabe dizer a diferença e continua mostrando um **loading** na tela para o usuário!

Podemos fazer esse controle criando um estado **isLoading**

O loading deve começar quando a **requisição** começa e terminar quando ela termina

Para o caso do erro, basta colocá-lo também em um **estado** que dirá se aconteceu um erro na requisição!

Ao fim, retornamos ele junto ao estado que guarda os dados:

import { useState, useEffect } from "react";
import axios from "axios";

export function useRequestData(url, initialState) {
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setData(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsError(error);
        console.log(error.response.data);
      });
  }, [url]);

  return [data, isLoading, error];
}

- Para acessar todos esses dados, utilizamos a sintaxe da desestruturação
- Teremos acesso ao loading, aos dados (se a requisição der certo) e ao erro (se a requisição der errado):

import React from 'react''
import { useRequestData } from './useRequestData'

export function App() {

//desestruturação 
	const [products, isLoading, error] = useRequestData(`${BASE_URL}/products`, [])

const renderProducts = products.map(product => {
			return <p>{product.name}</p>
		})

return (
	<div>
		{isLoading && <p>Carregando</p>} 
		{!isLoading && error && <p>Ocorreu um erro</p>}
		{!isLoading && products && products.length > 0 && renderProducts}
		{!isLoading && products && products.length === 0 && <p>Lista vazia</p>}
	</div>
	)
}

- No código acima há 4 situações possíveis:

1. A requisição ainda não terminou ⇒ Carregando

    {isLoading && <p>Carregando</p>} 


2. A requisição terminou e deu um erro

    {!isLoading && error && <p>Ocorreu um erro</p>} 


3. A requisição terminou e deu sucesso (Os dados retornados estão completos)

    {!isLoading && products && products.length > 0 && renderProducts}

4. Os dados retornados estão vazios (Ex: carrinho vazio, nenhum match correspondido)

    {!isLoading && products && products.length === 0 && <p>Lista vazia</p>}


# Resumo

1. Loadings são úteis para mostrar que um processo está ocorrendo e evitar que o usuário execute ações desnecessárias.
2. Para evitar que o usuário interaja com o aplicativo antes de um processo estar concluído, podemos utilizar os Loadings.
3. É possível controlar erros de requisições criando um estado isLoading, que começará e terminará junto com a requisição, e outro estado para informar erros.
4. Para acessar os dados retornados pelo hook utilizamos a desestruturação.
5. Podemos tratar diversas situações de requisições: carregando, erro, sucesso com dados e sucesso sem dados.

*/

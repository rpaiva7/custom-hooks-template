import { useState, useEffect } from "react";
import { BASE_URL } from "../constants/constants";
import axios from "axios";
//import {Title,NameContainer } from '../style'
//import { Card } from '../components/Card/Card'

export function useCapturarNome(){
  const [nomeUsuarios, setNomeUsuarios] = useState([]);
 
  useEffect(() => {
    axios
      .get(`${BASE_URL}users`)
      .then((response) => {
        setNomeUsuarios(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return nomeUsuarios;
}

  /* return (
    <div>
      <Title>Nomes dos usuários</Title>
      <NameContainer>
        {nomeUsuarios.map((usuario) => {
          return(
          <Card 
          key={usuario.id} 
          text={usuario.name} nomeUsuarios
          backgroudColor={'none'}
          textColor={'none'}
          />)
        })}
      </NameContainer>
    </div>
  ); */


//export default useCapturarNome;




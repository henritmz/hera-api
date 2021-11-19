import React from "react";
import { createContext } from "react";

interface ICursosResponse {
  _id: string;
  nome: string;
  categoria: string;
}

interface IContatosResponse {
  _id: string;
  nome: string;
  cpf: string;
  cep: string;
  logradouro: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  email: string;
  telefone: string;
  cursoID: string;
  whatsapp: string;
  status: string;
}

interface IConsumerApi {
  cursos?: Array<ICursosResponse>;
  contatos?: Array<IContatosResponse>;
  ApiCursos: string;
  ApiContatos: string;
  alterado(): void;
}

const ConsumerApiContext = createContext<IConsumerApi>({} as IConsumerApi);

export const ConsumerApiProvider: React.FC = ({ children }) => {
  const ApiCursos = "https://heraapi.herokuapp.com/cursos"
  const ApiContatos = "https://heraapi.herokuapp.com/contatos"
  const [alteracao, setAlteracao] = React.useState<boolean>(false)
  const [cursos, setCursos] = React.useState<Array<ICursosResponse> | undefined>()
  const [contatos, setContatos] = React.useState<Array<IContatosResponse> | undefined>()

  function alterado() {
    setAlteracao(!alteracao)
    setTimeout(() => {
      setAlteracao(!alteracao)
    }, 0.5);
  }

  React.useEffect(() => {
    async function API() {
      fetch(ApiContatos)
        .then(res => res.json())
        .then(e => setContatos(e))

      fetch(ApiCursos)
        .then(res => res.json())
        .then(e => setCursos(e))

    }
    API()
  }, [alteracao])

  return (
    <ConsumerApiContext.Provider
      value={{ cursos, contatos, ApiCursos, ApiContatos, alterado }}
    >
      {children}
    </ConsumerApiContext.Provider>
  );
};

export function useConsumerApi() {
  const context = React.useContext(ConsumerApiContext);
  return context;
}
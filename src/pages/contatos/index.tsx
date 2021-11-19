import React from "react";
import Link from 'next/link';
import type { NextPage } from "next";
import { useConsumerApi } from "../../context/ConsumerApi";
import Head from "next/head";
import styles from "../../styles/w3.module.css";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import AccordionSummary from "@material-ui/core/AccordionSummary";

interface IContatos {
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

const Contatos: NextPage = () => {
  const { ApiContatos, contatos, alterado } = useConsumerApi();

  async function handleEdit(
    contato: IContatos,
    e: React.ChangeEvent<HTMLSelectElement>
  ) {
    const form = {
      _id: contato._id,
      nome: contato.nome,
      cpf: contato.cpf,
      cep: contato.cep,
      logradouro: contato.logradouro,
      numero: contato.numero,
      bairro: contato.bairro,
      cidade: contato.cidade,
      uf: contato.uf,
      email: contato.email,
      telefone: contato.telefone,
      cursoID: contato.cursoID,
      whatsapp: contato.whatsapp,
      status: e.target.value,
    };

    const requestOptions = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(form),
    };

    fetch(ApiContatos + `/id=${contato._id}`, requestOptions).then((e) =>
      alterado()
    );
  }

  async function handleDelete(id: string) {
    const requestOptions = {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    };

    fetch(ApiContatos + `/id=${id}`, requestOptions).then((e) => alterado());
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Hera</title>
        <meta
          name="description"
          content="Bem-Vindo ao projeto HERA, veja todos os contatos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
      <nav>
          <Link href="/">
            <a
              className={`${styles.w3button} ${styles.w3blue} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margintop} ${styles.w3hoverindigo}
            ${styles.w3large}`}
            >
              Home
            </a>
          </Link>          
        </nav>
      </header>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Projeto <span className={styles.title2}>HERA</span>
        </h1>

        <p className={styles.description}>Veja todos os contatos!</p>

        <div>
          {contatos?.map((e) => {
            return (
              <>
                <Accordion
                  className={`${styles.w3center} ${styles.w3select} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margin}`}
                  key={e._id + "pp"}
                  style={{ width: 400 }}
                >
                  <AccordionSummary
                    key={e._id + "t"}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                  >
                    <Typography
                      style={{
                        fontWeight: 10,
                      }}
                      key={e._id + "j"}
                    >
                      {e.nome}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key={e._id + "q"}>
                    <Typography key={e._id + "a"}>
                      <ul key={e._id + "l"}>
                        <li>
                          <p>cpf: {e.cpf}</p>
                        </li>
                        <li>
                          <p>cep: {e.cep}</p>
                        </li>
                        <li>
                          <p>logradouro: {e.logradouro}</p>
                        </li>
                        <li>
                          <p>numero: {e.numero}</p>
                        </li>
                        <li>
                          <p>bairro: {e.bairro}</p>
                        </li>
                        <li>
                          <p>cidade: {e.cidade}</p>
                        </li>
                        <li>
                          <p>uf: {e.uf}</p>
                        </li>
                        <li>
                          <p>email: {e.email}</p>
                        </li>
                        <li>
                          <p>telefone: {e.telefone}</p>
                        </li>
                        <li>
                          <p>whatsapp: {e.whatsapp}</p>
                        </li>
                        <li>
                          <p>status: {e.status}</p>
                          <div>
                            <select
                              name="status"
                              id="status"
                              defaultValue="Novo"
                              onChange={(j) => handleEdit(e, j)}
                            >
                              <option value="NOVO">NOVO</option>
                              <option value="EM_ATENDIMENTO">
                                EM_ATENDIMENTO
                              </option>
                              <option value="CONTRATADO">CONTRATADO</option>
                              <option value="DESISTENTE">DESISTENTE</option>
                            </select>
                          </div>
                        </li>
                      </ul>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
                <button
                  className={`${styles.w3button} ${styles.w3blue} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margintop} ${styles.w3hoverindigo}
                ${styles.w3large}`}
                  onClick={() => handleDelete(e._id)}
                >
                  X
                </button>
              </>
            );
          })}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Contatos;

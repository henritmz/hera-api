import React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import Head from "next/head";
import { useConsumerApi } from "../context/ConsumerApi";
import styles from "../styles/w3.module.css";

const Home: NextPage = () => {
  const { cursos, ApiContatos } = useConsumerApi();
  const [categoriaCurso, setCategoriaCurso] =
    React.useState<string>("EDUCACAO_BASICA");
  const [contatoCriado, setContatoCriado] = React.useState<number>();
  const [form, setForm] = React.useState({
    nome: "",
    cpf: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    email: "",
    telefone: "",
    cursoID: "",
    whatsapp: "",
    status: "NOVO",
  });

  React.useEffect(() => {
    if (contatoCriado == 201) {
      setForm({
        ...form,
        nome: "",
        cpf: "",
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        uf: "",
        email: "",
        telefone: "",
        whatsapp: "",
      });
    }
  }, [contatoCriado]);

  function handleSelectCategoria(event: React.ChangeEvent<HTMLSelectElement>) {
    const select: HTMLSelectElement | any = document.getElementById("cursos");
    select.value = "select";
    setCategoriaCurso(event.target.value);
  }

  function handleSelectCurso(event: HTMLSelectElement | any) {
    const id = event.target.options[event.target.options.selectedIndex].id;
    setForm({ ...form, cursoID: id });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify(form),
    };

    fetch(ApiContatos, requestOptions).then((response) =>
      setContatoCriado(response.status)
    );
  }
  return (
    <div className={styles.w3container}>
      <Head>
        <title>Hera</title>
        <meta
          name="description"
          content="Bem-Vindo ao projeto HERA, cadastre-se em um dos nossos cursos"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <Link href="/cursos">
            <a
              className={`${styles.w3button} ${styles.w3blue} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margintop} ${styles.w3hoverindigo}
            ${styles.w3large}`}
            >
              Cursos
            </a>
          </Link>
          <Link href="/contatos">
            <a
              className={`${styles.w3button} ${styles.w3blue} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margintop} ${styles.w3hoverindigo}
            ${styles.w3large}`}
            >
              Contatos
            </a>
          </Link>
        </nav>
      </header>

      <main className={`${styles.main} ${styles.w3padding}`}>
        <h1 className={`${styles.title} ${styles.w3margin}`}>
          Projeto <span className={styles.title2}>HERA</span>
        </h1>

        <p className={`${styles.description} ${styles.w3margin}`}>
          Cadastre-se em um de nossos cursos!
        </p>

        <div className={`${styles.w3cell}`}></div>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={(e) => handleSubmit(e)}
        >
          <select
            className={`${styles.align} ${styles.w3select} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margin}`}
            name="categorias"
            id="categorias"
            defaultValue="EDUCACAO_BASICA"
            onChange={(e) => handleSelectCategoria(e)}
          >
            <option value="EDUCACAO_BASICA">Educação Básica</option>
            <option value="GRADUACAO">Graduação</option>
            <option value="POS_GRADUACAO">Pós Graduação</option>
            <option value="EDUCACAO_DISTANCIA">Educação a Distancia</option>
          </select>
          <select
            className={`${styles.align} ${styles.w3select} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margin}`}
            required
            name="cursos"
            id="cursos"
            defaultValue="select"
            onChange={(e) => handleSelectCurso(e)}
          >
            <option value={"select"} disabled>
              Select
            </option>
            {cursos?.map((e) => {
              if (e.categoria == categoriaCurso) {
                return (
                  <option key={e._id} id={e._id}>
                    {e.nome}
                  </option>
                );
              }
            })}
          </select>
          <label title="Nome">
            Nome
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              required
              type="text"
              name="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
            />
          </label>
          <label title="CPF">
            CPF
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              required
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={(e) => setForm({ ...form, cpf: e.target.value })}
            />
          </label>
          <label title="CEP">
            CEP
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              type="text"
              name="cep"
              value={form.cep}
              onChange={(e) => setForm({ ...form, cep: e.target.value })}
            />
          </label>
          <label title="Logradouro">
            Logradouro
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              type="text"
              name="logradouro"
              value={form.logradouro}
              onChange={(e) => setForm({ ...form, logradouro: e.target.value })}
            />
          </label>
          <label title="Número">
            Número
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              type="text"
              name="numero"
              value={form.numero}
              onChange={(e) => setForm({ ...form, numero: e.target.value })}
            />
          </label>
          <label title="Bairro">
            Bairro
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              type="text"
              name="bairro"
              value={form.bairro}
              onChange={(e) => setForm({ ...form, bairro: e.target.value })}
            />
          </label>
          <label title="Cidade">
            Cidade
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              type="text"
              name="cidade"
              value={form.cidade}
              onChange={(e) => setForm({ ...form, cidade: e.target.value })}
            />
          </label>
          <label title="UF">
            UF
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              type="text"
              name="uf"
              value={form.uf}
              onChange={(e) => setForm({ ...form, uf: e.target.value })}
            />
          </label>
          <label title="E-mail">
            E-mail
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              required
              type="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </label>
          <label title="Telefone">
            Telefone
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              required
              type="tel"
              name="telefone"
              value={form.telefone}
              onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            />
          </label>
          <label title="WhatsApp">
            WhatsApp
            <input
              className={`${styles.w3input} ${styles.w3border} ${styles.w3roundlarge}`}
              required
              type="tel"
              name="whatsapp"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
            />
          </label>
          <button
            className={`${styles.w3button} ${styles.w3blue} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margintop} ${styles.w3hoverindigo}
            ${styles.w3large}`}
            type="submit"
          >
            Cadastrar
          </button>
        </form>
        {contatoCriado == 201 ? (
          <p>Contato criado com sucesso</p>
        ) : (
          <p>Algo de errado ao criar o contato</p>
        )}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;

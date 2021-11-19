import React from "react";
import Link from 'next/link';
import type { NextPage } from "next";
import { useConsumerApi } from "../../context/ConsumerApi";
import Head from "next/head";
import styles from "../../styles/w3.module.css";

const Cursos: NextPage = () => {
  const { cursos, ApiCursos, alterado } = useConsumerApi();
  const [categoriaCurso, setCategoriaCurso] =
    React.useState<string>("EDUCACAO_BASICA");
  const [cursoCriado, setCursoCriado] = React.useState<number>();
  const [form, setForm] = React.useState({
    nome: "",
    categoria: "EDUCACAO_BASICA",
  });

  React.useEffect(() => {
    if (cursoCriado == 201) {
      setForm({
        nome: "",
        categoria: "EDUCACAO_BASICA",
      });
      alterado();
    }
  }, [cursoCriado]);

  function handleSelectCategoria(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategoriaCurso(event.target.value);
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

    fetch(ApiCursos, requestOptions).then((response) =>
      setCursoCriado(response.status)
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

    fetch(ApiCursos + `/id=${id}`, requestOptions).then((e) => alterado());
  }
  return (
    <div className={styles.container}>
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

        <p className={styles.description}>Cadastre um novo curso!</p>

        <div
          style={{
            display: "flex",
            width: "40rem",
            justifyContent: "space-between",
          }}
        >
          <div>
            <form
              className={`${styles.align}`}
              style={{ display: "flex", flexDirection: "column" }}
              onSubmit={(e) => handleSubmit(e)}
            >
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
               
              <label title="Categoria">
                Categoria
                <select
                  className={`${styles.w3center} ${styles.w3select} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margin}`}
                  name="categorias"
                  id="categorias"
                  defaultValue="EDUCACAO_BASICA"
                  onChange={(e) =>
                    setForm({ ...form, categoria: e.target.value })
                  }
                >
                  <option value="EDUCACAO_BASICA">Educação Básica</option>
                  <option value="GRADUACAO">Graduação</option>
                  <option value="POS_GRADUACAO">Pós Graduação</option>
                  <option value="EDUCACAO_DISTANCIA">
                    Educação a Distancia
                  </option>
                </select>
              </label>

              <button
                className={`${styles.w3button} ${styles.w3blue} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margintop} ${styles.w3hoverindigo}
              ${styles.w3large}`}
                type="submit"
              >
                Cadastrar novo curso
              </button>
            </form>
            {cursoCriado == 201 ? (
              <p>Curso criado com sucesso</p>
            ) : (
              <p>Algo de errado ao criar o Curso</p>
            )}
          </div>

          <div>
            <div>
              <select
                className={`${styles.w3center} ${styles.w3select} ${styles.w3border} ${styles.w3roundlarge} ${styles.w3padding} ${styles.w3margin}`}
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
            </div>

            <div>
              {cursos?.map((e) => {
                if (e.categoria == categoriaCurso) {
                  return (
                    <p key={e._id} id={e._id}>
                      {e.nome}{" "}
                      <button onClick={() => handleDelete(e._id)}>X</button>
                    </p>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Cursos;

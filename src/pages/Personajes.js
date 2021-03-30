import React from "react";
import { Api } from "../lib/Api";
import { Container, Grid } from "@material-ui/core";
import Personaje from "../components/personaje/Personaje";
import Paginador from "../components/paginador/Paginador";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class Personajes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personajes: [],
      infoApi: [],
      actualPage: 1,
    };
  }

  componentDidMount() {
    setTimeout(() => this.fetchPersonajes(), 2000);
  }

  fetchPersonajes = async () => {
    const personajesLocalStorage = localStorage.getItem("personajes");
    const infoLocalStorage = localStorage.getItem("info");

    if (personajesLocalStorage === null) {
      const response = await Api.getCharacters();
      const {
        data: { results, info },
      } = response;
      localStorage.setItem("personajes", JSON.stringify(results));
      localStorage.setItem("info", JSON.stringify(info));
      this.setState({ personajes: results, infoApi: info });
      return;
    }

    this.setState({
      personajes: JSON.parse(personajesLocalStorage).slice(0, 20),
      infoApi: JSON.parse(infoLocalStorage),
    });
    return JSON.parse(personajesLocalStorage);
  };

  fetchFromLocalStorage = () => JSON.parse(localStorage.getItem("personajes"));

  onChangePage = async (pageToChange) => {
    const personajesFromStorage = this.fetchFromLocalStorage();
    this.setState({ actualPage: pageToChange });
    const response = await Api.getPageCharacters(pageToChange);
    const {
      data: { results },
    } = response;
    results.forEach((item) => {
      const inArray = personajesFromStorage.some(({ id }) => id === item.id);
      if (!inArray) {
        personajesFromStorage.push(item);
        localStorage.setItem(
          "personajes",
          JSON.stringify(personajesFromStorage)
        );
      }
    });
    const arrFromStorage = this.fetchSpecificRangeFromStorage(results);
    this.setState({ personajes: arrFromStorage });
    return arrFromStorage;
  };

  fetchSpecificRangeFromStorage = (results) => {
    let personajesFromStorage = this.fetchFromLocalStorage();
    const firstIndex = personajesFromStorage.findIndex(
      (x) => x.id === results[0].id
    );
    const lastIndex = personajesFromStorage.findIndex(
      (x) => x.id === results[results.length - 1].id
    );

    //const primero = firstIndex === 0 ? firstIndex : firstIndex - 1;
    const segundo = lastIndex !== 19 ? lastIndex + 1 : lastIndex;
    const arrayFromStorage = personajesFromStorage.slice(firstIndex, segundo);

    return arrayFromStorage;
  };

  onChangeFav = (data) => {
    const personajes = this.fetchFromLocalStorage();
    const { personajes: statePJs } = this.state;
    if (personajes === null) {
      console.log("error");
      return;
    }
    const { id } = data;
    const nuevoArreglo = personajes.map((personaje) => {
      if (personaje.id === id) {
        personaje.favorito = !personaje.favorito;
        return personaje;
      }
      return personaje;
    });

    localStorage.setItem("personajes", JSON.stringify(nuevoArreglo));
    const updateStatePJ = this.fetchSpecificRangeFromStorage(statePJs);

    this.setState({ personajes: updateStatePJ });
    return nuevoArreglo;
  };

  render() {
    const {
      personajes,
      infoApi: { pages, count },
      actualPage,
    } = this.state;

    const personajesAPI =
      personajes.length !== 0 ? (
        <>
          <Grid container direction="row" justify="center" alignItems="center">
            <Paginador
              actualPage={actualPage}
              paginas={pages}
              onChangePage={this.onChangePage}
            />
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <p>{`Mostrando pagina ${actualPage} : ${personajes.length} registros de un total de ${count} `}</p>
          </Grid>
          <Container maxWidth="xl">
            <div className="content-pjs">
              {personajes.map(
                (
                  { id, name, status, species, type, image, gender, favorito },
                  index
                ) => {
                  return (
                    <Personaje
                      key={id}
                      id={id}
                      selFavorito={favorito}
                      imagen={image}
                      nombre={name}
                      estatus={status}
                      especie={species}
                      genero={gender}
                      tipo={type}
                      onChangeFav={this.onChangeFav}
                    />
                  );
                }
              )}
            </div>
          </Container>
        </>
      ) : (
        <Grid container direction="row" justify="center" alignItems="center">
          <CircularProgress />
        </Grid>
      );
    return <>{personajesAPI}</>;
  }
}

Personajes.propTypes = {
  infoApi: PropTypes.array,
};

Personajes.defaultProps = {
  infoApi: [],
};

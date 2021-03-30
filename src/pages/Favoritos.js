import React from "react";
import { Container, Grid } from "@material-ui/core";
import Personaje from "../components/personaje/Personaje";

export default class Favoritos extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      personajes: [],
    };
  }

  componentDidMount() {
    this.fetchFavoritos();
  }

  fecthFromLocalStorage = () => JSON.parse(localStorage.getItem("personajes"));

  fetchFavoritos = async () => {
    const personajesLocalStorage = this.fecthFromLocalStorage();

    if (personajesLocalStorage === null) {
      this.setState({ personajes: [] });
      return;
    }

    return this.misFavs(personajesLocalStorage);
  };

  misFavs = (personajesFromLocal) => {
    const misFavs = personajesFromLocal
      .filter((personaje) => personaje.favorito === true)
      .map((personaje) => personaje);
    this.setState({ personajes: misFavs });
    return misFavs;
  };

  onChangeFav = (data) => {
    const personajes = this.fecthFromLocalStorage();
    const { id } = data;
    if (personajes === null) {
      console.log("error");
      return;
    }

    const nuevoArreglo = personajes.map((personaje) => {
      if (personaje.id === id) {
        personaje.favorito = !personaje.favorito;
        return personaje;
      }
      return personaje;
    });
    localStorage.setItem("personajes", JSON.stringify(nuevoArreglo));
    return this.misFavs(nuevoArreglo);
  };

  render() {
    const { personajes } = this.state;

    const misFavoritos =
      personajes.length !== 0 ? (
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
      ) : (
        <Grid container direction="row" justify="center" alignItems="center">
          <p>No posee personajes favoritos aun.</p>
        </Grid>
      );
    return <>{misFavoritos}</>;
  }
}

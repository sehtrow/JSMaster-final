import React, { Component } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, IconButton } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './personaje.css';

export default class Personaje extends Component {


    constructor(props) {
        super(props)

        this.state = {
            favorito: false,
        }
    }

    onChangeFavorite = () => {
        const { favorito } = this.state
        const { id, onChangeFav } = this.props
        //const change = (favorito) ? false : true
        this.setState({ favorito: !favorito })
        const data = {
            id,
        }
        onChangeFav(data)
    }

    render() {
        const { imagen, nombre, estatus, especie, genero, tipo, selFavorito } = this.props
        const { favorito } = this.state
        const favoritoPj = (selFavorito === undefined) ? favorito : selFavorito
        return (
            <Card className="card-item">
                <CardMedia
                    image={imagen}
                    title={nombre}
                    className='imagen'
                />
                <CardContent>
                    <Typography variant="overline" color="textSecondary" component="h6" gutterBottom className="card-item-name" >
                        <strong>{`Nombre: ${nombre}`}</strong>
                    </Typography>
                    <ul>
                        <li><Typography variant="overline" color="textSecondary" component="p">
                            {`Estado: ${estatus}`}
                        </Typography></li>
                        <li><Typography variant="overline" color="textSecondary" component="p">
                            {`Especie: ${especie}`}
                        </Typography></li>
                        <li><Typography variant="overline" color="textSecondary" component="p">
                            {`Genero: ${genero}`}
                        </Typography></li>
                        <li><Typography variant="overline" color="textSecondary" component="p">
                            {`Tipo: ${(tipo === '') ? 'No especificado' : tipo}`}
                        </Typography></li>
                    </ul>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton onClick={this.onChangeFavorite} className={favoritoPj ? 'icon-favorite' : ''} aria-label="Agregar a Favoritos" title="Agregar a Favoritos" >
                        <FavoriteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        )
    }

}
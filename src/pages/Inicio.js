import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container, Grid, Card, CardContent, Typography } from '@material-ui/core';
import '../components/personaje/personaje.css';

export default class Inicio extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            arregloSpecies: [],
            rickOnArray: false,
            arregloHumansAlive: [],
        }
    }

    componentDidMount() {
        setTimeout(() => this.getFunctions(), 2000)
    }

    getFunctions = () => {
        this.getSpeciesFromStorageReduce()
        this.getRickOnArrayLocalStorage()
        this.getOnlyHumanAliveSpecies()
    }

    getSpeciesFromStorageReduce = () => {
        let totalReduce = []
        if (localStorage.getItem('personajes') !== null) {
            totalReduce = JSON.parse(localStorage.getItem('personajes')).reduce((total, pj) => {
                if (total.indexOf(pj.species) === -1) {
                    total.push(pj.species)
                }
                return total
            }, [])
        }
        this.setState({ arregloSpecies: totalReduce })
        return totalReduce
    }

    getRickOnArrayLocalStorage = () => {
        let isOnArray = false
        if (localStorage.getItem('personajes') !== null) {
            let res = JSON.parse(localStorage.getItem('personajes')).find(({ name }) => name === 'Rick Sanchez')
            isOnArray = (res === undefined) ? false : true
        }
        this.setState({ rickOnArray: isOnArray })
        return isOnArray
    }

    getOnlyHumanAliveSpecies = () => {
        let arrHumans = []
        if (localStorage.getItem('personajes') !== null) {
            let res = JSON.parse(localStorage.getItem('personajes')).filter(({ species }) => species === 'Human').filter(({ status }) => status === 'Alive')
            arrHumans = (res === undefined) ? [] : res
        }
        this.setState({ arregloHumansAlive: arrHumans })
        return arrHumans
    }

    getFirstFemaleCharacter = () => {
        const { arregloHumansAlive } = this.state
        let firstFemale = arregloHumansAlive.find(({ gender }) => gender === 'Female')
        firstFemale = (firstFemale === undefined) ? [] : firstFemale
        return firstFemale
    }

    render() {
        const { arregloSpecies, rickOnArray, arregloHumansAlive } = this.state
        const isRickThere = (rickOnArray !== false) ? (
            <Card className="card-item">
                <CardContent>
                    <Typography variant="overline" color="textSecondary" component="h6" gutterBottom className="card-item-name" >
                        <strong>{`Rick Sanchez se encuentra dentro de tu localStorage :) `}</strong>
                    </Typography>
                </CardContent>
            </Card>
        ) : (
            <>
                {
                    (JSON.parse(localStorage.getItem('personajes')) !== null) ? (
                        <></>
                    ) : (
                        <Card className="card-item">
                            <CardContent>
                                <Typography variant="overline" color="textSecondary" component="h6" gutterBottom className="card-item-name" >
                                    <strong>{`Rick Sanchez no encuentra dentro de tu localStorage :( `}</strong>
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }
            </>

        )
        const humansAlive = (arregloHumansAlive.length > 0) ? (
            <>
                <Card className="card-item">
                    <CardContent>
                        <Typography variant="overline" color="textSecondary" component="h6" gutterBottom className="card-item-name" >
                            {`Existen ${arregloHumansAlive.length} personajes humanos vivos`}
                        </Typography>
                        {
                            (this.getFirstFemaleCharacter().length === 0) ? (
                                <Typography variant="overline" color="textSecondary" component="h6" gutterBottom className="card-item-name" >
                                    {`Dentro del arreglo no se encuentra ningun personaje de genero Femenino`}
                                </Typography>
                            ) : (
                                <Typography variant="overline" color="textSecondary" component="h6" gutterBottom className="card-item-name" >
                                    {`El primero personaje femenino encontrado es ${this.getFirstFemaleCharacter().name}`}
                                </Typography>
                            )
                        }
                    </CardContent>
                </Card>
            </>
        ) : (
            <>
                {
                    (JSON.parse(localStorage.getItem('personajes')) !== null) ? (
                        <></>
                    ) : (
                        <Card className="card-item">
                            <CardContent>
                                <Typography variant="overline" color="textSecondary" component="h6" gutterBottom className="card-item-name" >
                                    Actualmente en tu localStorage no existen Humanos Vivos
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                }
            </>
        )
        const especies = (arregloSpecies.length > 0) ? (
            <>
                <Card className="card-item">
                    <CardContent>
                        <Typography variant="overline" color="textSecondary" component="h6" gutterBottom className="card-item-name" >
                            <strong>{`Especies Actuales Almacenadas en LocalStorage:`}</strong>
                        </Typography>
                        <ul>
                            {
                                arregloSpecies.map(a => {
                                    return <li key={a}><Typography variant="overline" color="textSecondary" component="p">{a}</Typography></li>
                                })
                            }
                        </ul>
                    </CardContent>
                </Card>
            </>
        ) : (
            <>
                {
                    (JSON.parse(localStorage.getItem('personajes')) !== null) ?
                        (<Grid container direction="row" justify="center" alignItems="center"><CircularProgress /></Grid>) :
                        (<Grid container direction="row" justify="center" alignItems="center"><p>Actualmente no hay especies almacenadas.</p></Grid>)
                }

            </>
        )
        return (
            <>
                <Container maxWidth="xl">
                    <div className="content-pjs">
                        {especies}
                        {isRickThere}
                        {humansAlive}
                    </div>
                </Container>

            </>
        )
    }
}
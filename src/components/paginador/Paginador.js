import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Paginador(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(props.actualPage);
  const handleChange = (_, value) => {
    setPage(value);
    props.onChangePage(value)
  };

  return (
    <div className={classes.root}>
      <Pagination count={props.paginas} page={page} onChange={handleChange} />
    </div>
  );
}
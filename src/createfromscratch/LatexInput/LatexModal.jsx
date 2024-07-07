import React from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import LatexInput from './LatexInput';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 'none',
  },
}));

export default function LatexModal({ isOpen, onClose, onSubmit, latexData,setLatexData }) {
  const classes = useStyles();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      className={classes.modal}
      aria-labelledby="latex-modal-title"
      aria-describedby="latex-modal-description"
    >
      <div className={classes.paper}>
        <h2 id="latex-modal-title">Enter LaTeX</h2>
        <LatexInput onClose={onClose} onSubmit={onSubmit} setLatexData={setLatexData} latexData={latexData} />
      </div>
    </Modal>
  );
};
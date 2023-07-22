import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import useDataContext from '../../context/useDataContext';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {

  const handleClose = () => setModal({...modal, isOpen : false});
  const {modal, setModal} = useDataContext();
  return (
    <div>
      <Modal
        open={modal.isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className='border-b'>
            {modal.title}
          </div>
          <div>
            {modal.content}
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}
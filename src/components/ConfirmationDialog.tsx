import React from 'react';
import styled from 'styled-components';

interface ConfirmationDialogProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DialogContainer = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DialogBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const DialogButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmButton = styled(DialogButton)`
  background-color: #4caf50;
  color: white;
`;

const CancelButton = styled(DialogButton)`
  background-color: #f44336;
  color: white;
`;

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <DialogContainer>
            <DialogBox>
                <p>{message}</p>
                <ConfirmButton onClick={onConfirm}>Yes</ConfirmButton>
                <CancelButton onClick={onCancel}>No</CancelButton>
            </DialogBox>
        </DialogContainer>
    );
};

export default ConfirmationDialog;

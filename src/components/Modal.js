import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";

ReactModal.setAppElement("body");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#333333",
    borderRadius: "20px",
    margin: "20px 50px",
    padding: "20px 50px",
  },
};
export default function Modal({
  modalIsOpen,
  setModalIsOpen,
  handleDelete,
  isLoading,
  postId,
}) {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Delete Modal"
    >
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Title>
            Tem certeza que deseja excluir essa publicação?
          </Title>
          <ButtonsContainer>
            <BackButton onClick={() => setModalIsOpen(!modalIsOpen)}>
              Não, voltar
            </BackButton>
            <DeleteButton onClick={() => handleDelete(postId[0])}>Sim, excluir</DeleteButton>
          </ButtonsContainer>
        </>
      )}
    </ReactModal>
  );
}

const Title = styled.h1`
  font-family: Lato;
  font-weight: bold;
  font-size: 34px;
  color: white;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 30px;
`;

const BackButton = styled.button`
  border-radius: 5px;
  background: white;
  color: #1877F2;
  border: none;
  outline: none;
  padding: 5px 20px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  border-radius: 5px;
  background: #1877F2;
  color: white;
  border: none;
  outline: none;
  padding: 5px 20px;
  cursor: pointer;
`;
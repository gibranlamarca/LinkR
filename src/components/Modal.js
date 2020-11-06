import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import {AiFillCloseSquare} from 'react-icons/ai';
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
  showLocation,
  currentLocation,
  setShowLocation
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
          showLocation ?
          <MapContainer>
            <header>
              <h1>{`${currentLocation.username}'s Location`}</h1>
              <button onClick={() => {setModalIsOpen(!modalIsOpen),setShowLocation(false)}} >
                <AiFillCloseSquare/>
              </button>
            </header>
            <iframe
            className='map'
            width="600"
            height="450"
            frameborder="0" 
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBXNwsnEb8z0gos8goYDmbKtqwrUtBNSbU&q=${currentLocation.position.latitude},${currentLocation.position.longitude}`} >
          </iframe>
            
          </MapContainer>
            :
            <>
              <Title>
                Tem certeza que deseja excluir essa publicação?
          </Title>
              <ButtonsContainer>
                <BackButton onClick={() => setModalIsOpen(!modalIsOpen)}>
                  Não, voltar
            </BackButton>
                <DeleteButton onClick={() => handleDelete()}>Sim, excluir</DeleteButton>
              </ButtonsContainer>
            </>
        )}
    </ReactModal>
  );
}

const MapContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  border-radius:10px;
  button{
    color:#fff;
    height: 50px;
    width:50px;
    font-size: 40px;
  }
  header{
    color:#fff;
    display:flex;
    justify-content:space-between;
    align-items:center;
    font-size: 26px;
  }
  @media(max-width:600px){
    &{
      width: 100%;
    }
    .map{
      width:300px;
    }
  }
`
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
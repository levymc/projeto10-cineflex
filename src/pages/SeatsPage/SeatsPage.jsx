import styled from "styled-components"
import axios from 'axios';
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function SeatsPage(props) {
    const [isLoading, setIsLoading] = useState(true);

    const icons = {
        selecionado: {
            border: "1px solid #0E7D71",
            backGroundColor: "#1AAE9E",
            msg: "Selecionado",
        },
        disponivel: {
            border: "1px solid #7B8B99",
            backGroundColor: "#C3CFD9",
            msg: "Disponível",
        },
        indisponivel: {
            border: "1px solid #F7C52B",
            backGroundColor: "#FBE192",
            msg: "Indisponível",
        }
    }
    const iconsArray = Object.entries(icons);

    const {state} = useLocation();
    const {day, time, id} = state;

    const [isSelected, setIsSelected] = useState([])
    const [movie, setMovie] = useState([])

    React.useEffect(() => {
        const fetchSeats = async () => {
            try {
            const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${id}/seats`);
            props.setAllSeats(response.data);
            } catch (error) {
            console.error('Erro ao buscar os assentos:', error);
            props.setAllSeats([]);
            }
        };

        const fetchMovie = async () => {
            try {
            const response = await axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${id}/showtimes`);
            setMovie(response.data);
            } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
            setMovie([]);
            }
        };

        const fetchData = async () => {
            setIsLoading(true); // Define isLoading como true antes de fazer as requisições
            try {
            await Promise.all([fetchSeats(), fetchMovie()]); // Aguarda as duas requisições
            } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            }
            setIsLoading(false); // Define isLoading como false quando os dados forem recebidos
        };

        fetchData();
        atualiza();
    }, []);

    const atualiza = () => {
        setIsSelected(
            props.allSeats?.seats?.map((selec, i) => false) || []
        );
    };
          

    const changeSelect = (index, newValue) => {
        setIsSelected(prevStatus => {
          const newArray = [...prevStatus];
          newArray[index] = newValue;
        //   console.log(newArray)
          return newArray;
        });
      };

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            
            <SeatsContainer>
                {props.allSeats.seats && props.allSeats.seats.map((seat, i) => 
                    <SeatItem 
                        isSelected = {isSelected[i]}
                        onClick={() =>
                            changeSelect(i, !isSelected[i])
                        }
                        key={seat.id}>
                        {seat.name}
                    </SeatItem>
                )}
            </SeatsContainer>

            <CaptionContainer>
                {iconsArray.map(([key, value]) => (
                    <CaptionItem key={key}>
                        <CaptionCircle 
                            iconsArray={iconsArray} 
                            key={key} 
                            border={value.border} 
                            backGroundColor={value.backGroundColor} 
                            
                        />
                        {value.msg}
                    </CaptionItem>
                    ))
                }
                
                {/* <CaptionItem>
                    <CaptionCircle />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle />
                    Indisponível
                </CaptionItem> */}
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button onClick={() => console.log(id)}>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{movie.title}</p>
                    <p>{day} - {time.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const LoadingContainer = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 100px;
`;


const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: ${(props) => props.border};
    background-color: ${(props) => props.backGroundColor};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: ${(props) => (props.isSelected ? "#1AAE9E" : "#C3CFD9")};
    cursor: pointer;
    background-color: ${(props) => (props.isSelected ? "#1AAE9E" : "lightblue")};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from 'axios';
import React, { useState } from "react";
import {BrowserRouter as Router, Route, Link, Routes, useNavigate} from 'react-router-dom';
import BtnHome from "./components/btnHome";

export default function App() {

    axios.defaults.headers.common['Authorization'] = 'JrVC988hm5rkhTQCtGv4DBlq';

    const [allMovies, setAllMovies] = useState([]);

    const [allSeats, setAllSeats] = useState([])

    React.useEffect(() => {
        const getMovies = async () => {
          try {
            const response = await axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
            setAllMovies(response.data);
          } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
            setAllMovies([]);
          }
        };
        
        getMovies();
      }, []);
    
    return (
        <>
            <Router>
                <NavContainer>
                    <BtnHome /> 
                    CINEFLEXCINEFLEX
                </NavContainer>

                <Routes>
                    <Route path="/" element={
                        <HomePage
                            allMovies = {allMovies}
                        />
                    }>
                    </Route>

                    <Route path="/sessoes/:idFilme" element={
                        <SessionsPage />
                    }></Route>

                    <Route path="/assentos/:idSessao" element={
                        <SeatsPage  
                            setAllSeats = {setAllSeats}
                            allSeats = {allSeats}
                        />
                    }>
                    </Route>
                    
                    <Route path="/sucesso" element={
                        <SuccessPage />
                    }>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    z-index:1;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from 'axios';
import React, { useState } from "react";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'JrVC988hm5rkhTQCtGv4DBlq';

    const [allMovies, setAllMovies] = useState([]);

    const [allSeats, setAllSeats] = useState([])

    React.useEffect(() => {
        const fetchMovies = async () => {
          try {
            const response = await axios.get('https://mock-api.driven.com.br/api/v8/cineflex/movies');
            setAllMovies(response.data);
          } catch (error) {
            console.error('Erro ao buscar os filmes:', error);
            setAllMovies([]);
          }
        };
        
        fetchMovies();
      }, []);
    
    return (
        <>
            <Router>
                <NavContainer onClick={() => window.location.reload()}>CINEFLEX</NavContainer>
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
                    
                    {/* <SuccessPage /> */}
                </Routes>
            </Router>
        </>
    )
}

const NavContainer = styled.div`
    cursor: pointer;
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
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

import styled from "styled-components"
import { useNavigate } from 'react-router-dom';


export default function HomePage(props) {
    const navigateTo = useNavigate();
    if(props.allMovies.length === 0){
        return <div>....Carregando</div>
    }else{
        return (
            <PageContainer>
                Selecione o filme
    
                <ListContainer>
                    {props.allMovies.map((movie, i) => 
                        <MovieContainer key={movie.id} data-test="movie">
                            <img 
                                id={movie.id} 
                                key={movie.id} 
                                src={movie.posterURL} 
                                alt={movie.title} 
                                onClick={() => {
                                    console.log(movie.id)
                                    navigateTo(`/sessoes/${movie.id}`, {
                                        state: {
                                            movieId: movie.id
                                        }
                                    });
                                }}
                            />
                        </MovieContainer>
                    )}
                </ListContainer>
    
            </PageContainer>
        )
    }
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        cursor: pointer;
        width: 130px;
        height: 190px;
    }
`
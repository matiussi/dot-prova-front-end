import styles from './styles.module.scss';
import { MovieItem } from '../MovieItem';
import { useState, useEffect } from 'react';
import { getMovies } from '../../helpers/api';
import { useSearch } from '../../context/search';
import Movie from '../../types/movie';


export function MovieList() {

   const [movieList, setMovieList] = useState<Movie[]>([]);

   const {search} = useSearch();

   useEffect(() => {
      /* Realizando um requisição para a API e obtendo os filmes mais populares
         no primeiro carregamento */
      const movieListApi = getMovies(`discover/movie?sort_by=popularity.desc`);
      movieListApi.then(movies => {
         setMovieList(movies)
      });
   },[]);

   useEffect(() => {
      if(search.query == ""){
         return;
      }
      const movieListApi = getMovies(`/search/movie?query=${search.query}`);
      movieListApi.then(movies => {
         setMovieList(movies)
      });
   }, [search]);

   return (
      <ul className={styles.movieList}>
         { movieList.map((movie) => {
            return ( 
               <MovieItem
                  key={movie.id} 
                  id={movie.id}
                  release_date={movie.release_date}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  genres={movie.genres}
                  poster_path={movie.poster_path}
               />
               );
            }
         )}
      </ul>
   )
}



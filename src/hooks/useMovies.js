// import withResults from '../mocks/with-results.json'
// import withoutResults from '../mocks/no-results.json'
import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState([])
    const [error, setError] = useState([])
    const previousSeacrh = useRef(search)
    
    const getMovies = useCallback(async ({search}) => {
            if (search === previousSeacrh.current) return   // para evitar la misma busqueda 
            try {
                setLoading(true)
                setError(null)
                previousSeacrh.current = search
                const newMovies = await searchMovies( { search })
                setMovies(newMovies)
            } catch(e){
                setError(e.message)
            } finally {
                // tanto en el try como en el catch
                setLoading(false)
            } 
    }, [])
    // const getMovies = useMemo(() => {
    //     return async ({search}) => {
    //         if (search === previousSeacrh.current) return   // para evitar la misma busqueda 
    //         try {
    //             setLoading(true)
    //             setError(null)
    //             previousSeacrh.current = search
    //             const newMovies = await searchMovies( { search })
    //             setMovies(newMovies)
    //         } catch(e){
    //             setError(e.message)
    //         } finally {
    //             // tanto en el try como en el catch
    //             setLoading(false)
    //         } 
    //     }
    // }, [])
    const sortedMovies = useMemo(() => {
      return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
    }, [sort, movies])
    return { movies: sortedMovies, getMovies, loading} // movies vamos a tener la lista de peliculas, en getMovies vas a tener una forma de recuperar las peliculas
    
    
    // const [responseMovies, setResponseMovies] = useState([])
    // const getMovies = () => {
    //     if (search){
    //         //setResponseMovies(withResults)
    //         fetch(`https://www.omdbapi.com/?apikey=5d017f8b&s=${search}`)
    //             .then(res => res.json())
    //             .then(json => {
    //                 setResponseMovies(json)
    //             })
    //     } else {
    //         setResponseMovies(withoutResults)
    //     }
    // }
    // return { movies: mappedMovies, getMovies}
  }
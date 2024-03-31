/*
Hace la petición a la API para buscar peliculas por la palabra que venga en search
*/
const API_KEY = ''
export const searchMovies = async ({ search }) => {
    if (search === '') return null
    try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
        const json = await response.json()
        // del json que tenemos, extraemos la propiedad Search
        const movies = json.Search
        // mapeamos los datos de la API, a gusto de nosotros 
        return movies?.map(movie => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster
        }))
    } catch (e) {
        throw new Error('Error searching movies')
    }
}
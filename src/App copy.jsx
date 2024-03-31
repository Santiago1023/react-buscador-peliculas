import './App.css'
import { useEffect, useRef, useState } from 'react' 
/* 
useRef es un hook que te permite crear una referencia mutable que persiste
durante todo el ciclo de vida de todo el componente, es muy util para guardar cualquier valor que puedas mutar
como un id, como un contador, como un elemento del dom, y que cada vez que cambia no vuelve a renderizar el componente
y eso es lo que lo hace totalmente diferente al useState porque cada vez que cambia se vuelve a renderizar el componente
pero el useRef cada vez que cambia no dispara nuevo renderizado
*/
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'

// los customHooks se utilizan para extraer logica de nuestros componentes  


// con el DOM y el useRef son de forma no controlada
// con el useState es de forma controlada, cada vez que actualiza el texto, se renderiza y es lento

function App() {
  const { movies } = useMovies()

  const [query, setQuery] = useState('')
  
  //const inputRef = useRef()
  // cada vez que queramos acceder al valor de una referencia, hay que acceder desde current
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   const inputEl = inputRef.current 
  //   const value = inputEl.value  
  //   console.log(value)
  // }
  
  // sin depender del useRef , si tuvieras 10 inputs, tendrías que usar 10 referencias!!
  const handleSubmit = (event) => {
    event.preventDefault()
    /* esto es para cuando tenemos diferentes inputs, accederiamos a ellos con el name del input
    const fields = Object.fromEntries(new window.FormData(event.target))
    console.log(fields)
    */
   /* funciona para un solo input
    const fields = new window.FormData(event.target)
    const query = fields.get('query')
    console.log(query)
    */
   /* funciona para un solo input
   const { query } = Object.fromEntries(new window.FormData(event.target))
   console.log(query)
   */
    console.log({query});
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          {/* <input ref={inputRef} type="text" placeholder='Avengers, Star Wars, The Matrix' /> con useRef */}
          {/* <input name='query' type="text" placeholder='Avengers, Star Wars, The Matrix' /> con el DOM */}
          <input value={query} onChange={handleChange} name='query' type="text" placeholder='Avengers, Star Wars, The Matrix' />
          <button type='submit'>Buscar</button>
        </form>

      </header>
      <main>
        <Movies movies={movies}/>
      </main>
    </div>
  )
}

export default App

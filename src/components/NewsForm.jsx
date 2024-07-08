export const NewsForm = ({ onSubmit }) => {    
  return (
      <form onSubmit={onSubmit} id='newsForm'>
          <h3>Agrega una noticia</h3>
          <div>
              <input type="text" name='title' id='title' placeholder='Coloca tu titulo' required />
          </div>

          <div>
              <textarea name='description' id='description' placeholder='Coloca una descripción' maxLength={500} rows={5} required></textarea>
          </div>

          <button type='submit'>Agregar</button>
      </form>
  )
}

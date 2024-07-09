export const NewsForm = ({ onSubmit }) => {    
  return (
      <form onSubmit={onSubmit} id='newsForm'>
          <h3>Agrega una noticia</h3>
          <div>
              <label htmlFor="title">Título</label>
              <input type="text" name='title' id='title' placeholder='Coloca tu titulo' required />
          </div>

          <div>
              <label htmlFor="description">La descripcion de la noticia</label>
              <textarea name='description' id='description' placeholder='Coloca una descripción' maxLength={500} rows={5} required></textarea>
          </div>

          <div>
              <label htmlFor="date">Fecha de la noticia</label>
              <input type="date" name="date" id="date" />
          </div>

          <button type='submit'>Agregar noticia</button>
      </form>
  )
}

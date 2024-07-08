import { useState, useEffect } from 'react'
import { ID } from './lib/appwrite'
import { APPWRITE_DATABASE_ID, APPWRITE_NEWS_COLLECTION_ID } from './lib/env'

import useDatabase from './hooks/useDatabase'
import './app.css'
import { NewsForm } from './components/NewsForm'

const App = () => {
  const [news, setNews] = useState([])
  const { get, add } = useDatabase(APPWRITE_DATABASE_ID, APPWRITE_NEWS_COLLECTION_ID)

  useEffect(() => {
    async function fetch() {
      const data = await get()
      setNews(data)
    }

    fetch()
  })

  async function createNews(e) {
    // obtener los datos del formulario
    e.preventDefault()

    const formData = new FormData(e.target)
    const news = Object.fromEntries(formData)

    if(news) {
      await add(ID.unique(), news, () => {
        alert("Noticia agregada")
      })
    }
  }

  function formatDate (date) {
    const formattedDate = new Date(date)
    return formattedDate.getDate() + "/" + formattedDate.getMonth() + "/" + formattedDate.getFullYear()
  }

  return (
    <main>
      <section>
        <NewsForm onSubmit={ createNews }/>
      </section>

      <section>
      { // reverse: Para invertir el array y, cada vez que se agrege un
      // nuevo elemento aparecerá primero
        news.reverse().map((n) => (
          <div key={n.$id} className='newsCard'>
            <div><h3>{ n.title }</h3></div>
            <div>{ n.description }</div>
            <div>{ n.author && n.author + ' - ' } { formatDate(n.date) } </div>
          </div>
        ))
      }
      </section>
    </main>
  )
}

export default App

import { useState } from 'react'
import { database, ID } from './lib/appwrite'
import { APPWRITE_DATABASE_ID, APPWRITE_NEWS_COLLECTION_ID } from './lib/env'
import { useEffect } from 'react'

const App = () => {
  const [news, setNews] = useState([])

  async function getNews() {
    const res = await database.listDocuments(APPWRITE_DATABASE_ID, APPWRITE_NEWS_COLLECTION_ID)
    setNews(res.documents)
  }

  useEffect(() => {
    getNews()
  }, [])

  async function createNews(e) {
    // obtener los datos del formulario
    e.preventDefault()

    const formData = new FormData(e.target)
    const news = Object.fromEntries(formData)

    if(news) {
      await database.createDocument(APPWRITE_DATABASE_ID, APPWRITE_NEWS_COLLECTION_ID, ID.unique(), {
        title: news.title,
        description: news.description
      })
    }
  }

  function formatDate (date) {
    const formattedDate = new Date(date)
    return formattedDate.getDate() + "/" + formattedDate.getMonth() + "/" + formattedDate.getFullYear()
  }

  return (
    <main>
      <form onSubmit={createNews}>
        <div>
        <input type="text" name='title' id='title' placeholder='Coloca tu titulo' />
        </div>

        <div>
        <input type="text" name='description' id='description' placeholder='Coloca una descripción'/>
        </div>

        <button type='submit'>Agregar</button>
      </form>
      {
        news.map((n) => (
          <div key={n.$id}>
            <div><h3>{ n.title }</h3></div>
            <div>{ n.description }</div>
            <div>{ n.author }: { formatDate(n.date) } </div>
          </div>
        ))
      }
    </main>
  )
}

export default App

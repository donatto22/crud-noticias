// eslint-disable-next-line no-unused-vars
import { ID, database } from '../lib/appwrite'

/**
 * 
 * @param { String } databaseId 
 * @param { String } collectionId 
 * @description Hook creado para utilizar desde Appwrite una base de datos y una coleccion
 */
const useDatabase = (databaseId, collectionId) => {
    // Read
    /**
     * @returns Documentos
     */
    const get = async () => {
        try {
            const res = await database.listDocuments(databaseId, collectionId)
            return res.documents
        } catch (e) {
            console.log(e.message)
        }
    }

    // Create
    /**
     * 
     * @param { ID } id El Id unico para crear el documento
     * @param { Object } data El objeto json que contiene la data a insertar 
     */
    const add = async (id, data, onSuccess, onFail) => {
        try {
            await database.createDocument(databaseId, collectionId, id, data)
            onSuccess && onSuccess()
        } catch(e) {
            console.log(e.message)
            onFail && onFail()
        }
    }

    // delete
    const remove = async (id, onSuccess, onFail) => {
        try {
            await database.deleteDocument(databaseId, collectionId, id)
            onSuccess && onSuccess()
        } catch(e) {
            console.log(e.message)
            onFail && onFail()
        }
    }

    return {
        get, add, remove
    }
}

export default useDatabase
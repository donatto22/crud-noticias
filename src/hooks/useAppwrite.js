// eslint-disable-next-line no-unused-vars
import { ID, database, account as AppwriteAccount } from '../lib/appwrite'

/**
 * @param { String } databaseId 
 * @param { String } collectionId 
 * @param { String } documentId 
 * @description Hook creado para utilizar desde Appwrite una base de datos y una coleccion
 */
const useDatabase = (databaseId, collectionId, documentId) => {
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

    /**
     * @param { ID } id
     * @param { Object } data
     */
    const edit = async (id, data) => {
        // await database.updateDocument(id, collectionId, )
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

    /**
     * @param { String } email 
     * @param { String } password 
     */

    const loginWithEmailAndPassword = async (email, password) => {
        let session = null

        try {
            session = await AppwriteAccount.createEmailPasswordSession(email, password)
        } catch (e) {
            console.log(e.message)
        }

        const account = AppwriteAccount.get()

        return {
            session, account
        }
    }

    return {
        get, add, edit, remove, loginWithEmailAndPassword
    }
}

export default useDatabase
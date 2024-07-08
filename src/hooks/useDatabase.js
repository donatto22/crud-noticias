import { database } from '../lib/appwrite'

const useDatabase = (databaseId, collectionId) => {
    const get = async () => {
        try {
            const res = await database.listDocuments(databaseId, collectionId)
            return res.documents
        } catch (e) {
            console.log(e.message)
        }
    }

    return {
        get
    }
}

export default useDatabase
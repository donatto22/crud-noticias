const useToken = () => {
    const existToken = () => {
        return localStorage.getItem('token') ? true : false
    }
    
    const getToken = () => {
        return localStorage.getItem('token')
    }
    
    const setToken = (token) => {
        localStorage.setItem('token', token)
    }
    
    const deleteToken = () => {
        localStorage.removeItem('token')
    }

    return {
        getToken, setToken, deleteToken, existToken
    }
}

export default useToken
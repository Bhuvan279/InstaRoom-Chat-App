import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import HomePage from "../pages/HomePage"
import { AuthContext } from "./AuthContext"

const PrivateRoute = () => {
    let authToken = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null
    
    return (
        authToken ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute
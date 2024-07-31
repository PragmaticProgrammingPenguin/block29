import { Outlet, Navigate } from "react-router-dom"

export default function ProtectedRoute(){
    const getToken = () => localStorage.getItem("token")
    return getToken() ? <Outlet /> : <Navigate to="/login" />
}
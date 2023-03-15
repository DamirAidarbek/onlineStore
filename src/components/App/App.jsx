import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "../AppRoutes/AppRoutes";
import Sidebar from "../SideBar/Sidebar";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import UserForm from "../User/UserForm";

import { getCategories } from "../../features/categories/categoriesSlice";
import { getProducts } from "../../features/products/productsSlice";

const App = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCategories())
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className="app">
            <Header />
            <UserForm />

            <div className="container">
                <Sidebar />
                <AppRoutes />
            </div>

            <Footer />
        </div>
    )
}

export default App

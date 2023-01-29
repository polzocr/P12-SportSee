import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Accueil from './pages/Accueil/Accueil';
import ErrorPage from './pages/ErrorPage/ErrorPage';



const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            
            <Route path='/' element={<Layout />}>
                <Route index element={<Accueil />} />
            </Route>
            <Route path='*' element={<ErrorPage />}/>
            
        </>
    )
)




function Router() {  
    return (
       <RouterProvider router={router} />
    )
}

export default Router

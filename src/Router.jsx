import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import Layout from './pages/Layout/Layout';
import Accueil, {LoadingApi} from './pages/Accueil/Accueil';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import Error from './components/Error';


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            
            <Route path='/' element={<Layout />}>
                
            </Route>
            <Route path='/:id'
                element={<Accueil />}
                loader={LoadingApi}
            />
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

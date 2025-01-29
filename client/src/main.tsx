import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import HomePage from './pages/HomePage.tsx';
import LoginPage from './pages/LoginPage.tsx';
import PlansPage from './pages/PlansPage.tsx';
import BrowsePage from './pages/BrowsePage.tsx';
import WatchPage from './pages/WatchPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';
import {Provider} from "react-redux";
import {store} from "./app/store";
import PrivateRoutes from './utils/PrivateRoutes.tsx';
import PublicRoutes from './utils/PublicRoutes.tsx';


const router  = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/" element={<PublicRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="/browse" element={<PrivateRoutes />}>
        <Route path="/browse" element={<BrowsePage />} />
        <Route path="/browse/watch/:id" element={<WatchPage />} />
        <Route path="/browse/plans" element={<PlansPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <Provider store={store}> <RouterProvider router={router} /> </Provider>
)

import {
  createHashRouter,
  RouterProvider
} from "react-router-dom";

import { Suspense } from "react";
import './App.scss';
import AppContextProvider from "./AppContext";
import Login from "./components/Login/Login";
import ProtectedRoutes from "./routes/PotectedRoutes";



const App = () => {
  
  const router = createHashRouter([
    { path: "*", element: <ProtectedRoutes /> },
    { path: "login", element: <Login /> },
  ]);

  return (
    <AppContextProvider>
      <Suspense fallback={<h1>Loading...</h1>}>
        <RouterProvider router={router}/>
      </Suspense>
    </AppContextProvider>
  )
}

export default App

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FormBlueprintExample from "./components/inputblueprint/FormBlueprintExample";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.min.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./components/App";
import ReactHookForm from "./components/formhook/ReactHookForm";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/input-blue",
        element: <FormBlueprintExample/>
    },
    {
        path: "/react-hook-form",
        element: <ReactHookForm/>
    },
]);

root.render(
    <React.Fragment>
        <RouterProvider router={router}/>
    </React.Fragment>
);

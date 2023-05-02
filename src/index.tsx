import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FormExample from "./components/FormExample";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.Fragment>
        <FormExample></FormExample>
    </React.Fragment>
);

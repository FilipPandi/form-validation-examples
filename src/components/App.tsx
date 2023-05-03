import React from 'react';
import {Button} from "primereact/button";
import {Link} from "react-router-dom";
import "../App.css";

export default function App() {
    return (
        <React.Fragment>
            <div style={{padding: "20px"}}>
                <h1>FORMS</h1>

                <div className={"container-grid"}>
                    <Link className={"link"} to="/input-blue"><Button severity="secondary" icon="pi pi-spin pi-cog" label={"Form Blueprint"}/></Link>
                    <Link className={"link"} to="/react-hook-form"><Button severity="secondary" icon="pi pi-spin pi-cog" label={"React Hook Form"}/></Link>
                </div>

            </div>
        </React.Fragment>
    );
}
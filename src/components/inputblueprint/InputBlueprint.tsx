import {InputText} from 'primereact/inputtext';
import React, {useState} from "react";

export default function InputBlueprint({id, label}: { id: string, label: string }) {

    const [data, setData] = useState({[{id}["id"]]: ""});
    const updateData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.id]: e.target.value
        });
    }

    return (
        <React.Fragment>
            <div className="card flex justify-content-center">
            <span className="p-float-label">
                <InputText id={id} name={id} value={data[{id}["id"]]} onChange={(e) => updateData(e)}/>
                <label htmlFor={id}>{label}</label>
            </span>
            </div>
        </React.Fragment>
    );
}

import InputBlueprint from "./InputBlueprint";
import React, {useState} from "react";
import {Button} from "primereact/button";
import {Link} from "react-router-dom";

//Primitive validation
export default function FormBlueprintExample() {

    const [errors, setErrors] = useState({
        address: "",
        firstName: "",
        lastName: "",
        age: ""
    });

    const validate = (data: any) => {
        let errors = {
            firstName: "",
            lastName: "",
            address: "",
            age: ""
        };

        if (!data.firstName) {
            errors.firstName = 'First name is required.';
        }

        if (!data.lastName) {
            errors.lastName = 'Last name is required.';
        }

        if (!data.address) {
            errors.address = 'Address is required.';
        }

        if (!data.age) {
            errors.age = 'Age is required.';
        }

        return errors;
    };


    const submitForm = (e: any) => {
        e.preventDefault();

        const data = {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            address: e.target.address.value,
            age: e.target.age.value
        };

        setErrors(validate(data));
    }

    return (
        <React.Fragment>

            <form onSubmit={submitForm}
                  style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100vh',
                      columnGap: '1%'
                  }}>
                <Link className={"link"} to="/"><Button severity="secondary" icon="pi pi-angle-double-left" label={"Back"}/></Link>

                <div>
                    <InputBlueprint id={"firstName"} label={"First name"}></InputBlueprint>
                    <span style={{color: "red", position: "absolute", padding: "10px"}}>{errors.firstName}</span>
                </div>

                <div>
                    <InputBlueprint id={"lastName"} label={"Last name"}></InputBlueprint>
                    <span style={{color: "red", position: "absolute", padding: "10px"}}>{errors.lastName}</span>
                </div>

                <div>
                    <InputBlueprint id={"address"} label={"Address"}></InputBlueprint>
                    <span style={{color: "red", position: "absolute", padding: "10px"}}>{errors.address}</span>
                </div>

                <div>
                    <InputBlueprint id={"age"} label={"Age"}></InputBlueprint>
                    <span style={{color: "red", position: "absolute", padding: "10px"}}>{errors.age}</span>
                </div>

                <Button label="Submit"></Button>
            </form>
        </React.Fragment>
    );
}

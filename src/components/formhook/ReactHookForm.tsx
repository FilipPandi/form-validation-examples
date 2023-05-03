import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {TextModel} from "../../api/data/TextModel";
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";

export default function ReactHookForm() {

    const intiData = new TextModel(
    null,
    '',
    ''
);

    const [formData, setFormData] = useState(intiData);
    const [showMessage, setShowMessage] = useState(false);

    // Service.getAllText().then(r => {
    //     console.log(r)
    // });

    const {control, formState: {errors}, handleSubmit, reset} =
        useForm({mode: "onTouched"});

    const onSubmit = (data: FieldValues) => {
        console.log(data);
        const textModel = new TextModel(
            null,
            data?.text,
            data?.textType
        );

        setFormData(textModel);
        setShowMessage(true);

        reset(data);
    };

    const getFormErrorMessage = (name: string) => {
        return errors[name] && <small className="p-error">{errors[name]?.message?.toString()}</small>
    };


    return (
        <React.Fragment>
            <div className={'separator20'}>

                <Link className={"link"} to="/"><Button severity="secondary" icon="pi pi-angle-double-left"
                                                        label={"Back"}/></Link>
            </div>

            <div className={'separator20'}>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="container-grid">
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="text" control={control} rules={{required: 'Text is required.', maxLength: 10}}
                                            render={({field, fieldState}) => (
                                                <InputText id={field.name} {...field} value={field.value}
                                                           className={classNames({'p-invalid': fieldState.invalid})}/>
                                            )}/>
                                <label htmlFor="text" className={classNames({'p-error': errors.text})}>Text*</label>
                            </span>
                            {getFormErrorMessage('text')}
                        </div>
                    </div>

                    <div className={'separator10'}></div>

                    <Button type="submit" label="Submit" className="mt-2"/>
                </form>
            </div>


        </React.Fragment>
    );
}
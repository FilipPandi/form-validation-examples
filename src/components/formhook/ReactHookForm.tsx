import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {TextModel} from "../../api/data/TextModel";
import {Controller, FieldValues, useForm} from 'react-hook-form';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import {Service} from "../../api/Service";
import {Dropdown} from "primereact/dropdown";
import {TextType} from "../../api/data/TextType";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Panel} from "primereact/panel";

export default function ReactHookForm() {
    console.log("CALLED");
    const [allTexts, setAllTexts] = useState([]);
    const intiData = new TextModel(
        null,
        '',
        ''
    );

    const textTypes: TextType[] = [
        TextType.TEXT1,
        TextType.TEXT2,
        TextType.TEXT3
    ];

    const [formData, setFormData] = useState(intiData);
    const [showMessage, setShowMessage] = useState(false);
    const {control, formState: {errors}, handleSubmit, reset} =
        useForm({defaultValues: intiData, mode: "onTouched"});

    const onSubmit = (data: FieldValues) => {
        const textModel = new TextModel(
            null,
            data?.text,
            data?.textType.code
        );

        setFormData(textModel);
        setShowMessage(true);

        Service.save(textModel)
            .catch((response) => {
                console.log(response);
            });

        reset(formValues => ({
            id: null,
            text: '',
            textType: ''
        }));
    };

    useEffect(() => {
        let active = true;
        if (active) {
            Service.getAllText().then((response) => {
                setAllTexts(response.data)
            });
        }

        return (() => {
            active = false;
        })
    }, [formData]);

    const getFormErrorMessage = (name: string) => {
        // 'cas of 'defaultValue' on useForm - it wants gibberish object as errors field
        // @ts-ignore
        return errors[name] && <small className="p-error">{errors[name]?.message}</small>
    };


    return (
        <React.Fragment>
            <div className={'separator20'}>

                <Link className={"link"} to="/"><Button severity="secondary" icon="pi pi-angle-double-left"
                                                        label={"Back"}/></Link>
            </div>

            <div className={'separator20'}>
                <Panel header={"Form"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-grid">
                            <div className="field">
                            <span className="p-float-label">
                                <Controller name="text" control={control}
                                            rules={{required: 'Text is required.', maxLength: 10}}
                                            render={({field, fieldState}) => (
                                                <InputText id={field.name} {...field} value={field.value}
                                                           className={classNames({'p-invalid': fieldState.invalid})}/>
                                            )}/>
                                <label htmlFor="text" className={classNames({'p-error': errors.text})}>Text*</label>
                            </span>
                                {getFormErrorMessage('text')}
                            </div>

                            <div className="field">
                            <span className="p-float-label">
                                <Controller name="textType" control={control}
                                            rules={{required: 'Text type is required.'}}
                                            render={({field, fieldState}) => (
                                                <Dropdown style={{width: '100%'}} id={field.name} {...field}
                                                          value={field.value} options={textTypes} optionLabel="name"
                                                          className={classNames({'p-invalid': fieldState.invalid})}/>
                                            )}/>
                                <label htmlFor="textType"
                                       className={classNames({'p-error': errors.textType})}>Text Type*</label>
                            </span>
                                {getFormErrorMessage('textType')}
                            </div>
                        </div>

                        <div className={'separator10'}></div>

                        <Button type="submit" label="Submit" className="mt-2"/>
                    </form>
                </Panel>
            </div>

            <div className={'separator20'}>
                <DataTable value={allTexts} paginator rows={3} rowsPerPageOptions={[5, 10, 25, 50]}
                           tableStyle={{minWidth: '50rem'}}>
                    <Column field="id" header="ID" style={{width: '33%'}}></Column>
                    <Column field="text" header="Text" style={{width: '33%'}}></Column>
                    <Column field="textType" header="Text Type" style={{width: '33%'}}></Column>
                </DataTable>
            </div>
        </React.Fragment>
    );
}
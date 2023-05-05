import React, {useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from "primereact/button";
import {TextModel} from "../../api/data/TextModel";
import {Control, Controller, DeepRequired, FieldErrorsImpl, FieldValues, useForm} from 'react-hook-form';
import {InputText} from "primereact/inputtext";
import {classNames} from "primereact/utils";
import * as Service from "../../api/Service";
import {Dropdown} from "primereact/dropdown";
import {TextType} from "../../api/data/TextType";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {Panel} from "primereact/panel";
import {Divider} from 'primereact/divider';
import {Fieldset} from "primereact/fieldset";
import {Toast} from "primereact/toast";

const getFormErrorMessage = (name: string, errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>>) => {
    // ts-ignore - 'cas of 'defaultValue' on useForm - it wants gibberish object as errors field
    // @ts-ignore
    return errors[name] && <small className="p-error">{errors[name]?.message}</small>
};

function FormInput(control: Control<any>,
                   errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>>) {
    return <div className="field">
                            <span className="p-float-label">
                                <Controller name="text" control={control}
                                            rules={{
                                                required: 'Field: `Text` is required.',
                                                maxLength: {value: 10, message: 'Maximum length exceeded.'},
                                                minLength: {value: 2, message: 'Minimum length required.'}
                                            }}
                                            render={({field, fieldState}) => (
                                                <InputText id={field.name} {...field} value={field.value}
                                                           className={classNames({'p-invalid': fieldState.invalid})}/>
                                            )}/>
                                <label htmlFor="text" className={classNames({'p-error': errors.text})}>Text*</label>
                            </span>
        {getFormErrorMessage('text', errors)}
    </div>;
}


function DropDownInput(control: Control<any>,
                       errors: Partial<FieldErrorsImpl<DeepRequired<FieldValues>>>) {

    const textTypes: TextType[] = [
        TextType.TEXT1,
        TextType.TEXT2,
        TextType.TEXT3
    ];

    return <div className="field">
                            <span className="p-float-label">
                                <Controller name="textType" control={control}
                                            rules={{required: 'Field: `Text Type` is required.'}}
                                            render={({field, fieldState}) => (
                                                <Dropdown style={{width: '100%'}} id={field.name} {...field}
                                                          value={field.value} options={textTypes} optionLabel="name"
                                                          className={classNames({'p-invalid': fieldState.invalid})}/>
                                            )}/>
                                <label htmlFor="textType"
                                       className={classNames({'p-error': errors.textType})}>Text Type*</label>
                            </span>
        {getFormErrorMessage('textType', errors)}
    </div>;
}

export default function ReactHookForm() {
    const toastRef = useRef<any>();
    const [allTexts, setAllTexts] = useState([]);
    const intiData = new TextModel(
        null,
        '',
        ''
    );

    const [formData, setFormData] = useState(intiData);
    const {control, formState: {errors}, handleSubmit, reset} =
        useForm({defaultValues: intiData, mode: "onTouched"});

    const onSubmit = (data: FieldValues) => {
        const textModel = new TextModel(
            null,
            data?.text,
            data?.textType.code
        );

        setFormData(textModel);

        Service.save(textModel)
            .then(response => {
                toastRef?.current?.show({severity: 'success', summery: 'success', detail: 'Data saved!'});
            }).catch((error) => {
            toastRef?.current?.show({severity: 'error', summery: 'error', detail: error.response.data});
        });

        reset(formValues => ({
            id: null,
            text: '',
            textType: ''
        }));
    };

    useEffect(() => {
        //Race condition fix
        let active = true;
        if (active) {
            Service.getAllText().then((response) => {
                toastRef?.current?.show({severity: 'info', summery: 'success', detail: 'Data fetched from server...'});
                setAllTexts(response.data)
            }).catch((error) => {
                toastRef?.current?.show({severity: 'error', summery: 'error', detail: error.response.data});
            });
        }

        return (() => {
            active = false;
        })
    }, [formData]);

    return (
        <React.Fragment>
            <Toast ref={toastRef as any}></Toast>
            <div className={'separator20'}>
                <Link className={"link"} to="/"><Button severity="secondary" icon="pi pi-angle-double-left"
                                                        label={"Back"}/></Link>
            </div>

            <div className={'separator20'}>
                <Panel header={"Text Form"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-grid">
                            {FormInput(control, errors)}
                            {DropDownInput(control, errors)}
                        </div>

                        <Divider/>

                        <Button type="submit" severity={"warning"} label="Save" className="mt-2"/>
                    </form>
                </Panel>
            </div>

            <div className={"separator20"}>
                <Fieldset legend="Database data">
                    <DataTable value={allTexts} paginator rows={3} rowsPerPageOptions={[5, 10, 25, 50]}
                               tableStyle={{minWidth: '50rem'}}>
                        <Column field="id" header="ID" style={{width: '33%'}}></Column>
                        <Column field="text" header="Text" style={{width: '33%'}}></Column>
                        <Column field="textType" header="Text Type" style={{width: '33%'}}></Column>
                    </DataTable>
                </Fieldset>
            </div>

        </React.Fragment>
    );
}
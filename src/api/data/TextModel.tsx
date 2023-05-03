import {TextType} from "./TextType";
import {Nullable} from "primereact/ts-helpers";


export class TextModel {

     id:  Nullable<number>;
     text: string;
     textType: TextType;

    constructor(id: Nullable<number> , text: string, textType: TextType) {
        this.id = id;
        this.text = text;
        this.textType = textType;
    }
}
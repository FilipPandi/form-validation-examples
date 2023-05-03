import {TextModel} from "./data/TextModel";
import axios from "axios";

export class Service {

    private static url: string = "http://localhost:8081";
    private static uri: string = "/text";

    static async save(textData: TextModel) {
       return await axios.post(this.url + this.uri + "/save", textData);
    }

    static async getAllText(): Promise<TextModel> {
        return await axios.get(this.url + this.uri + "/getAllText");
    }
}
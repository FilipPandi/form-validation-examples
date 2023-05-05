import {TextModel} from "./data/TextModel";
import axios from "axios";

const url: string = "http://localhost:8081";
const uri: string = "/text";

export async function save(textData: TextModel) {
    return await axios.post(url + uri + "/save", textData);
}

export async function getAllText() {
    return await axios.get(url + uri + "/getAllText");
}

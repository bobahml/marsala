import { Injectable } from "@angular/core";
import { HttpService } from "../Services/HttpService";

@Injectable()
export class UsersService {

    constructor(private http: HttpService) {
    }

    getAllUsers(): Promise<string[]> {
        return this.http.get<string[]>("users");
	}
}
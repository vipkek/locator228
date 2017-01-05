/**
 * Created by ilyapolyakov on 1/4/17.
 */
import {Injectable} from '@angular/core'
import {Http, Headers, Response} from '@angular/http'
import {Observable} from 'rxjs'
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    public token: string;

    constructor(private http: Http) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post('api/authentificate', JSON.stringify({username: username, password: password}))
            .map((response: Response) => {
                let token = response.json() && response.json().token;
                if(token) {
                    this.token = token;
                    //if we get token from backend - store it to local
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));

                    return true;
                } else {
                    return false;
                }
            });
    }

    logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

}
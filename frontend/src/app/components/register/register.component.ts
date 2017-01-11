/**
 * Created by ilyapolyakov on 1/10/17.
 */
import {Component} from '@angular/core'
import {Router} from '@angular/router'

import {AuthenticationService} from '../../services'

@Component({
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;
    error = '';

    constructor(private router: Router, private authenticationService: AuthenticationService) {}

    register() {
        this.loading = true;

        this.authenticationService.register(this.model.username, this.model.password, this.model.email)
            .subscribe(result => {
                if(result === true) {
                    this.router.navigate(['/']);
                } else {
                    this.error = 'user already exist';
                    this.loading = false;
                }
            });
    }
}


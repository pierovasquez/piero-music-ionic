import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  validationMessages = {
    email: [
      { type: 'required', message: 'Email required' },
      { type: 'email', message: 'This is a not valid email' }
    ],
    password: [
      { type: 'required', message: 'Password required' },
      { type: 'minlength', message: 'Password must have at least 4 characters' }
    ]
  };
  errorMessage = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController,
    private storage: Storage
    ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }


  loginUser() {
    if (this.form.valid) {
      this.authService.loginUser(this.form.value).then(res => {
        this.errorMessage = '';
        this.storage.set('isUserLoggedIn', true);
        this.navCtrl.navigateForward('/menu');
      }).catch(res => {
        this.errorMessage = res;
      });
    }
    console.log(this.form.value);
  }

  // Events

  onRegisterClick() {
    this.navCtrl.navigateForward('/register');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }
}

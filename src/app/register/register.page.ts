import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  validationMessages = {
    email: [
      { type: 'required', message: 'Email required' },
      { type: 'email', message: 'This is a not valid email' }
    ],
    password: [
      { type: 'required', message: 'Password required' },
      { type: 'minlength', message: 'Password must have at least 4 characters' }
    ],
    name: [
      { type: 'required', message: 'Name required' },
    ],
    surname: [
      { type: 'required', message: 'Surname required' },
    ]
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navCtrl: NavController
  ) {
    this.buildForm();
  }

  ngOnInit() {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]]
    });
  }

  registerUser() {
    if (this.form.valid) {
      this.authService.registerUser(this.form.value).then(res => {
        console.log('res', res);
        this.navCtrl.navigateBack('/login');
      });
    }
  }


  onGoToLogin() {
    this.navCtrl.navigateBack('/login');
  }


  get nameField() {
    return this.form.get('name');
  }
  get surnameField() {
    return this.form.get('surname');
  }

  get emailField() {
    return this.form.get('email');
  }

  get passwordField() {
    return this.form.get('password');
  }
}

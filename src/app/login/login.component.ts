import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private url = 'http://localhost:3000/signupUsersList';
  public loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      user: [''],
      password: ['', Validators.required],
    });
  }
  login() {
    this.http.get<any>(this.url).subscribe(
      (res) => {
        const user = res.find((a: any) => {
          return (
            a.usuario === this.loginForm.value.usuario &&
            a.password === this.loginForm.value.password
          );
        });
        if (user) {
          alert('Login Succesful');
          this.loginForm.reset();
          this.router.navigate(['pokedex']);
        } else {
          alert('user not found');
        }
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
}

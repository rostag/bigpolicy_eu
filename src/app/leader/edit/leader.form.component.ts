// leader.form.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// signup.interface.ts
export interface User {
  name: string;
  account: {
    email: string;
    confirm: string;
  };
}

@Component({
  selector: 'app-leader-form',
  templateUrl: './leader.form.component.html'
})
export class LeaderFormComponent implements OnInit {

  user: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.user = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      account: this.fb.group({
        email: ['', Validators.required],
        confirm: ['', Validators.required]
      })
    });
    console.log('UUUUUSER.', this.user);
  }

  onSubmit() {
    console.log(this.user.value, this.user.valid);
  }

}

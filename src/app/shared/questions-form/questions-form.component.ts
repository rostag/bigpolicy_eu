import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-questions-form',
  templateUrl: './questions-form.component.html',
  styleUrls: ['./questions-form.component.scss']
})
export class QuestionsFormComponent implements OnInit {
  questionForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    this.questionForm = this.fb.group({
      userName: [''],
      email: [''],
      quesionText: [''],
    });
  }

  ngOnInit() {
  }

}

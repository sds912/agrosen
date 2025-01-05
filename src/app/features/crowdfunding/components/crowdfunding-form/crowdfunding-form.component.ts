import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crowdfunding-form',
  templateUrl: './crowdfunding-form.component.html',
  styleUrls: ['./crowdfunding-form.component.scss'],
})
export class CrowdfundingFormComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      targetFund: [null, [Validators.required, Validators.min(1)]],
      image: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      // Submit the form data via an API
    }
  }
}

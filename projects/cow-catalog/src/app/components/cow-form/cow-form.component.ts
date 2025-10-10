import { Component, inject, OnInit, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { Cow } from '@digital/core';

@Component({
  selector: 'app-cow-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    SelectButtonModule,
    ButtonModule,
  ],
  templateUrl: './cow-form.component.html',
  styleUrls: ['./cow-form.component.scss'],
})
export class CowFormComponent implements OnInit {
  public cowForm!: FormGroup;

  public statuses = [
    { label: 'Active', value: 'Active' },
    { label: 'In Treatment', value: 'InTreatment' },
    { label: 'Deceased', value: 'Deceased' },
  ];

  public genders = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];

  private fb = inject(FormBuilder);
  public cowAdded = output<Cow>();

  /**
   * Builds the form structure on component load.
   */
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Creates and configures the cow form with default values and validators.
   */
  private buildForm(): void {
    this.cowForm = this.fb.group({
      earTag: ['', Validators.required],
      gender: ['Male', Validators.required],
      pen: ['', Validators.required],
      status: ['Active', Validators.required],
      weight: [null, Validators.min(0)],
    });
  }

  /**
   * Handles form submission.
   * Emits the form value if all fields are valid.
   */
  onSubmit(): void {
    if (this.cowForm.valid) {
      this.cowAdded.emit(this.cowForm.value);
    }
  }
}
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Instruction } from 'src/app/shared/interfaces/instruction';

@Component({
  selector: 'app-instruction-card',
  templateUrl: './instruction-card.component.html',
  styleUrls: ['./instruction-card.component.css'],
})
export class InstructionCardComponent implements OnInit {
  @Input() instructions: Instruction[] | undefined;
  @Input() toggleEdit: boolean = false;

  editInstructionsForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editInstructionsForm = this.fb.group({
      instructions: this.fb.array([]),
    });

    const newInstructions = <FormArray>(
      this.editInstructionsForm.get('instructions')
    );
    this.instructions?.forEach((instruction: Instruction, i: number) => {
      newInstructions.push(this.fb.control(instruction.content));
    });

    console.log(this.editInstructionsForm.controls);
  }
}

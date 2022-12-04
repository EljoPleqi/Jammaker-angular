import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Instruction } from 'src/app/shared/interfaces/instruction';

@Component({
  selector: 'app-instruction-card',
  templateUrl: './instruction-card.component.html',
  styleUrls: ['./instruction-card.component.css'],
})
export class InstructionCardComponent implements OnInit {
  @Input() instructions: Instruction[] | undefined = [];
  @Input() toggleEdit: boolean = false;

  @Output() getNewInstructions: EventEmitter<Instruction[]> = new EventEmitter<
    Instruction[]
  >();

  editInstructionsForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editInstructionsForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.editInstructionsForm = this.fb.group({
      instructions: this.fb.array([]),
    });
  }

  assembleNewInstrucastions() {
    const newInstructions = <FormArray>(
      this.editInstructionsForm.get('instructions')
    );
    this.instructions?.forEach((instruction: Instruction) => {
      newInstructions.push(this.fb.control(instruction.content));
    });

    this.getNewInstructions.emit(newInstructions.value as Instruction[]);
  }
}

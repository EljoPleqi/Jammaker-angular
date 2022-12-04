import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, skip } from 'rxjs';
import { Instruction } from 'src/app/shared/interfaces/instruction';
import { UtilitiesService } from 'src/app/shared/services/utilities.service';

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
  newInstructions: FormArray;

  constructor(
    private fb: FormBuilder,
    private utilitiesService: UtilitiesService
  ) {
    this.editInstructionsForm = this.fb.group({
      instructions: this.fb.array([]),
    });
    this.newInstructions = <FormArray>(
      this.editInstructionsForm.get('instructions')
    );
  }

  ngOnInit(): void {
    this.instructions?.forEach((instruction: Instruction) => {
      this.newInstructions.push(this.fb.control(instruction.content));
    });

    this.utilitiesService.childEvent$.pipe(skip(1)).subscribe((_) => {
      this.assembleNewInstrucastions(this.editInstructionsForm);
    });
  }

  assembleNewInstrucastions(form: FormGroup) {
    this.getNewInstructions.emit(
      form.get('instructions')?.value as Instruction[]
    );
  }
}

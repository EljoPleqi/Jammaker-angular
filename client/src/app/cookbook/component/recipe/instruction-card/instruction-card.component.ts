import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { skip, switchMap } from 'rxjs';
import { Instruction } from 'src/app/shared/interfaces/instruction';
import { RecipeUpdateStateService } from '../shared/services/recipe-update-state.service';

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
    private recipeUpdateStateService: RecipeUpdateStateService
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

    this.recipeUpdateStateService.gatherData$
      .pipe(skip(1))
      .pipe(
        switchMap((_) =>
          this.recipeUpdateStateService.gatherNewInstructions(
            this.assembleNewInstrucastions(this.editInstructionsForm)
          )
        )
      )
      .subscribe();
  }

  private assembleNewInstrucastions = (form: FormGroup) =>
    form.get('instructions')?.value as Instruction[];
}

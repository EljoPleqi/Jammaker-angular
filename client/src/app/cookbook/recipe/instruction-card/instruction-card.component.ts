import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Instruction } from 'src/app/shared/interfaces/instruction';

@Component({
  selector: 'app-instruction-card',
  templateUrl: './instruction-card.component.html',
  styleUrls: ['./instruction-card.component.css'],
})
export class InstructionCardComponent implements OnInit {
  @Input() instructions: Instruction[] | undefined;
  @Input() toggleEdit: boolean = false;

  editInstructionsForm: FormGroup | undefined = undefined;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.editInstructionsForm = this.fb.group({
      // instructions: this.fb.array(),
    });
  }
}

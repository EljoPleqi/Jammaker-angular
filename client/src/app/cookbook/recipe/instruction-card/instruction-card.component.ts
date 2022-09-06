import { Component, Input, OnInit } from '@angular/core';
import { Instruction } from 'src/app/shared/interfaces/instruction';

@Component({
  selector: 'app-instruction-card',
  templateUrl: './instruction-card.component.html',
  styleUrls: ['./instruction-card.component.css'],
})
export class InstructionCardComponent implements OnInit {
  @Input() instruction!: Instruction;

  constructor() {}

  ngOnInit(): void {
    console.log(this.instruction);
  }
}

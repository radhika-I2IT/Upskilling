import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calcbtns, CalculatorResponse } from '../calcbtns/calcbtns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, Calcbtns],
  templateUrl: './calculator.html',
  styleUrl: './calculator.css',
})
export class Calculator implements OnInit {

  public answer: string | null= "0";
  public previousValue: number | null = null;
  public operator: string | null = null;
  public calcInputArray: CalculatorResponse | undefined;
  public showSmallValue : boolean = false;
  
  ngOnInit(): void {
    
  }
  checkShowSmallValue()
  {
    return (this.calcInputArray !=null && this.calcInputArray != undefined && (this.calcInputArray?.firstValue != null || this.calcInputArray?.operator != ""|| this.calcInputArray?.secondValue != null));
  }

  calcButtonList: Array<string> = ['%', 'CE', 'C', 'Back', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '+/-', '0', '.', '+', '=', 'Enter'];
  getChildValue(event: any) {
    //console.log(event)
    this.calcInputArray = event;
    this.answer = (this.calcInputArray?.currentValue??0).toString();
  }
}

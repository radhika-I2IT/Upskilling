import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-calcbtns',
  imports: [CommonModule],
  templateUrl: './calcbtns.html',
  styleUrl: './calcbtns.css',
})
export class Calcbtns implements OnInit {
  ngOnInit(): void {
  }
  @Input() currentBtnValue: string = ''; //24 
  @Input() calcInputArray: CalculatorResponse | undefined;
  @Output() calculateValue = new EventEmitter<CalculatorResponse>();
  disabledBtns: Array<string> = ['%', 'CE', '+/-', '.','Back']
  previousValue: string = "";

  isOperator(value: string) {
    return ['+', '-', '/', '*'].includes(value)
  }
  isNumber(value: string) {
    return (typeof Number(value) === 'number' && !isNaN(Number(value)))
  }

  sendValue() {
    //console.log(this.currentBtnValue);
    if (this.calcInputArray == undefined || this.calcInputArray == null) {
      this.calcInputArray = new CalculatorResponse();
      if (this.isNumber(this.currentBtnValue)) {
        this.calcInputArray.firstValue = Number(this.currentBtnValue);
        this.calcInputArray.initialValue = this.currentBtnValue;
        this.calcInputArray.currentValue = this.calcInputArray.firstValue;
      }
      else {
        this.calcInputArray.initialValue = this.currentBtnValue == "-" || this.currentBtnValue == "+" ? "0" + this.currentBtnValue : "";
      }
    }
    else {

      let enterFun = false;
      if (this.calcInputArray.isAnswer) {
        if (this.isOperator(this.currentBtnValue)) {
          this.calcInputArray.firstValue = this.calcInputArray.responseValue;
          this.calcInputArray.operator = this.currentBtnValue;
          this.calcInputArray.initialValue = this.calcInputArray.responseValue?.toString() + this.calcInputArray.operator;
          this.calcInputArray.isAnswer = false;
          this.calcInputArray.secondValue = null;
          this.calcInputArray.responseValue = 0;
          enterFun=true;
        }
        if(this.isNumber(this.currentBtnValue))
        {
          this.calcInputArray = new CalculatorResponse();
          this.calcInputArray.firstValue = Number(this.currentBtnValue);
          this.calcInputArray.initialValue = this.calcInputArray.firstValue.toString();
          enterFun =true;
        }
      }
      else if (this.calcInputArray.firstValue == null && this.isNumber(this.currentBtnValue)) {
        this.calcInputArray.firstValue = Number(this.currentBtnValue);
        this.calcInputArray.initialValue = this.currentBtnValue;
        this.calcInputArray.currentValue = this.calcInputArray.firstValue;
        enterFun = true;
      }
      else if (this.calcInputArray.firstValue != null && !this.isNumber(this.currentBtnValue) && this.isOperator(this.currentBtnValue) && this.calcInputArray.operator == "") {
        this.calcInputArray.operator = this.currentBtnValue;
        this.calcInputArray.initialValue += this.currentBtnValue;
        enterFun = true;
      }
      else if (this.calcInputArray.firstValue != null && this.isNumber(this.currentBtnValue) && this.isOperator(this.calcInputArray.operator) && this.calcInputArray.secondValue == null) {
        this.calcInputArray.secondValue = Number(this.currentBtnValue);
        this.calcInputArray.initialValue += this.currentBtnValue;
        this.calcInputArray.currentValue = this.calcInputArray.secondValue;
        enterFun = true;
      }
      else if (this.currentBtnValue == "=" || this.currentBtnValue == "Enter") {
        if (this.calcInputArray.firstValue != null && this.isOperator(this.calcInputArray.operator) && this.calcInputArray.secondValue != null) {
          this.calcInputArray.responseValue = this.calculate(this.calcInputArray);
          this.calcInputArray.initialValue = this.calcInputArray.responseValue.toString();
          this.calcInputArray.currentValue = this.calcInputArray.responseValue;


          this.calcInputArray.firstValue = null;
          this.calcInputArray.secondValue = null;
          this.calcInputArray.operator = "";
          this.calcInputArray.isAnswer = true;
        }
        enterFun = true;
      }

      if (this.calcInputArray.firstValue != null && this.calcInputArray.operator == "" && this.isNumber(this.currentBtnValue) && enterFun == false) {
        this.calcInputArray.initialValue += this.currentBtnValue;
        this.calcInputArray.firstValue = Number(this.calcInputArray.firstValue.toString() + this.currentBtnValue);
        enterFun = true;
      }
      else if (this.calcInputArray.firstValue != null && this.calcInputArray.operator != "" && this.isNumber(this.currentBtnValue) && enterFun == false) {
        this.calcInputArray.initialValue = this.calcInputArray.firstValue.toString() + this.calcInputArray.operator + this.calcInputArray.secondValue?.toString();
        this.calcInputArray.secondValue = Number(this.calcInputArray.firstValue.toString() + this.currentBtnValue);
        enterFun = true;
      }
    }

    if(this.currentBtnValue == "C")
    {
      this.calcInputArray = new CalculatorResponse();
      this.calcInputArray.initialValue ="0";
    }
    // if(this.currentBtnValue == "Back"){
    //   let backValue = this.calcInputArray.initialValue.slice(0,(this.calcInputArray.initialValue.length-2))
    //   this.calcInputArray.initialValue = backValue;      
    // }
    this.calculateValue.emit(this.calcInputArray);
  }

  calculate(objValue: CalculatorResponse): number {
    var returnValue = 0;
    if (objValue.firstValue != null && objValue.secondValue != null && objValue.operator != "") {
      if (objValue.operator == "+")
        returnValue = objValue.firstValue + objValue.secondValue;
      if (objValue.operator == "-")
        returnValue = objValue.firstValue - objValue.secondValue;
      if (objValue.operator == "*")
        returnValue = objValue.firstValue * objValue.secondValue;
      if (objValue.operator == "/")
        returnValue = objValue.firstValue / objValue.secondValue;
    }
    return returnValue;
  }
}
export class CalculatorResponse {

  constructor() {
    this.responseValue = 0;
    this.isAnswer = false;
    this.firstValue = null;
    this.secondValue = null;
    this.initialValue = "";
    this.operator = "";
  }
  public responseValue: number | null = 0;
  public isAnswer: boolean = false;
  public firstValue: number | null = null;
  public secondValue: number | null = null;
  public operator: string = "";
  public initialValue: string = "";
  public currentValue: number | null = null;

}
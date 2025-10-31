import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,FormsModule, IonInput, IonButton],
})
export class HomePage {
  displayValue: string = '0';
  firstNumber: number | null = null;
  operator : string | null = null;
  waitingForSecondNumber : boolean = false;
  operation : String='';


  constructor() {}

  clear(){
    this.displayValue='0';
    this.firstNumber=null;
    this.operator=null;
    this.waitingForSecondNumber=false;
    this.operation = '';
  }

  pressNumber(num : string){
    if(this.displayValue === '0' || this.waitingForSecondNumber){

      this.displayValue= num;

      this.waitingForSecondNumber=false;
    }
    else{
        this.displayValue= this.displayValue+num;
    }
  }

  pressOperator(op : string){

      const inputValue = parseFloat(this.displayValue);

      if(this.firstNumber===null){
        this.firstNumber=inputValue;
      }
      this.operator=op;
      this.operation = this.displayValue + ' ' + op;
      this.waitingForSecondNumber=true;
  }

pressBack(){
  if(this.displayValue.length===1 || this.displayValue==='0'){
    this.displayValue='0';
    this.operation = '';
  }else{
  this.displayValue = this.displayValue.slice(0, -1)
  }
}

  pressEqual(){

    const inputValue = parseFloat(this.displayValue);

    if(this.firstNumber!=null && this.operator!=null){
      let result = 0;
      switch(this.operator){
        case '+':
          result = (this.firstNumber + inputValue);
                this.displayValue=String (result);
          break;
        case '-':
          result = (this.firstNumber - inputValue);
                this.displayValue=String (result);
          break;
        case '/':
          if(inputValue === 0){
            this.displayValue='Syntax Err0r';
          }else{
          result = (this.firstNumber / inputValue);
                this.displayValue=String (result);
          }
          break;
        case 'x':
          result = (this.firstNumber * inputValue);
                this.displayValue=String (result);
        break;
      }

      this.operation = this.firstNumber + ' ' + this.operator +' '+ inputValue + ' =';
      this.firstNumber=null
      this.operator=null
      this.waitingForSecondNumber=false

    }
  }
}

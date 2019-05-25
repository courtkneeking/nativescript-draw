import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute,  Router  } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { DrawingService } from './drawing.service';
// const timerModule = require("tns-core-modules/timer");
import * as dialogs from "tns-core-modules/ui/dialogs";
@Component({
    selector: "ns-drawing",
    moduleId: module.id,
    templateUrl: "./drawing.component.html",
    styleUrls: ['./drawing.component.css'],
})
export class DrawingComponent implements OnInit {
  time: any = 10;
  drawing: Boolean = false;
  constructor(private drawingService: DrawingService, 
    private router: Router, 
    private route: ActivatedRoute, 
    private routerExtensions: RouterExtensions) { }
    @ViewChild('DrawingPad') DrawingPad: ElementRef;
    ngOnInit() {
      this.startTime();
    };
    startTime(){
      var that = this;
      var timerID = setInterval(function downSecond(){
        if(that.time == 0){
          clearInterval(timerID);
          console.log('cleared', that.time);
          that.getIt();
        }else{
          that.time --;
          // let x:any = that.time;
          // x = x - 1;
          // that.time = x;
          console.log('continue' , that.time);
        }
      },1000);
    };
    errorDialogue(){
      var that = this;
      dialogs.alert({
        message: "Your drawing is empty",
        okButtonText: "Restart"
      }).then(() => {
        that.restart();
      })
    }
    restart(){
      this.time = 60;
      this.startTime();
    }
    submit(){
      this.time = 0;
      console.log('cleared');
      this.getIt();
    }
    getIt(){
      let that = this;
      let pad = this.DrawingPad.nativeElement;
      pad.getDrawing()
      .then((result) => {
         this.drawingService.fullImage(result)
        },(error) => {
          console.log('drawing pad is empty');
          that.errorDialogue();
      });
    }
    clearMyDrawing(args) {
      var pad = this.DrawingPad.nativeElement;
      pad.clearDrawing();
    }
    changeWidth(width , args){
      var pad = this.DrawingPad.nativeElement;
      let x = pad.penWidth;
      x = x + width;
      pad.penWidth = x;
    }
    changeColor(color, args){
      var pad = this.DrawingPad.nativeElement;
      pad.penColor = color;
    }
}

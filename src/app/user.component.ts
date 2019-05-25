import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { DrawingService } from './drawing.service';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Image } from "ui/image";
import { DrawingPad } from 'nativescript-drawingpad';

@Component({
    selector: "ns-user",
    moduleId: module.id,
    templateUrl: "./user.component.html",
    styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
    secondPad;
    time: Number = 10;
    constructor(private router: Router, private route: ActivatedRoute, private routerExtensions: RouterExtensions, private drawingService: DrawingService) {
    }
    @ViewChild('DrawingPad') DrawingPad: ElementRef;
    ngOnInit() {
      let pad = this.DrawingPad.nativeElement;
      let x = this.drawingService.fullImg;
      pad.setNativeView(x);
      this.startTime();
    }
    startTime(){
      var that = this;
      var timerID = setInterval(function downSecond(){
        if(that.time == 0){
          clearInterval(timerID);
          console.log('cleared', that.time);
          that.getIt();
        }else{
          let x:any = that.time;
          x = x - 1;
          that.time = x;
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
      this.time = 10;
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
      let drawingImage;
      pad.getDrawing()
      .then((result) => {
        drawingImage = result;
        that.secondPad = result;
        that.drawingService.saveImage(that.secondPad);
        },(error) => {
          console.log('drawing pad is empty');
          that.errorDialogue();
      });
    }
    // submitDrawing(args) {
    //   let that = this;
    //   let pad = this.DrawingPad.nativeElement;
    //   let drawingImage;
    //   pad.getDrawing()
    //   .then(
    //   function(data) {
    //     console.log(data);
    //     drawingImage = data;
    //     that.secondPad = data;
    //   },
    //   function(err) {
    //     console.log(err);
    //   });
    // }
    // saveDrawing(){
    //   console.log('save drawing user')
    //   this.drawingService.saveImage(this.secondPad);
    // }    
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





// import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { RouterExtensions } from "nativescript-angular/router";
// import { Image } from "ui/image";
// import { DrawingService } from './drawing.service';
// import { DrawingPad } from 'nativescript-drawingpad';
// var ImageSourceModule = require("image-source");
// import  * as imageSourceModule from "image-source";
// @Component({
//     selector: "ns-user",
//     moduleId: module.id,
//     templateUrl: "./user.component.html",
//     styleUrls: ['./user.component.css'],
// })
// export class UserComponent implements OnInit {
//     img;
//     fullImg;
//     image: Image;
//     secondPad;
//     pad;
//     constructor(private router: Router, private route: ActivatedRoute, private routerExtensions: RouterExtensions, private drawingService: DrawingService) {
//     }
//     @ViewChild('DrawingPad') DrawingPad: ElementRef;
//     ngOnInit() {
//       let pad = this.DrawingPad.nativeElement;
//       let x = this.drawingService.fullImg;
//       pad.setNativeView(x);
//       console.log('pad' , pad);
//     }
    
//     submitDrawing(args) {
//       let that = this;
//       let pad = this.DrawingPad.nativeElement;
//       let drawingImage;
//     pad.getDrawing().then(
//       function(data) {
//         console.log(data);
//         drawingImage = data;
//         that.secondPad = data;
//       },
//       function(err) {
//         console.log(err);
//       });
//     }
//     saveDrawing(){
//       console.log('save drawing user')
//       this.drawingService.saveImage(this.secondPad);
//     }    
//     clearMyDrawing(args) {
//       var pad = this.DrawingPad.nativeElement;
//       pad.clearDrawing();
//     }
//     changeWidth(width , args){
//       var pad = this.DrawingPad.nativeElement;
//       let x = pad.penWidth;
//       x = x + width;
//       pad.penWidth = x;
//     }
//     changeColor(color, args){
//       var pad = this.DrawingPad.nativeElement;
//       pad.penColor = color;
//     }

// }
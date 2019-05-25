import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { registerElement } from 'nativescript-angular/element-registry';
import { DrawingPad } from 'nativescript-drawingpad';
import * as Facebook from "nativescript-facebook";

registerElement('DrawingPad', () => DrawingPad);

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit{ 
     ngOnInit(){

     }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router  } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
import { DrawingService } from './drawing.service';
import { fromBase64 } from "image-source";


@Component({
    selector: "ns-savedDrawings",
    moduleId: module.id,
    templateUrl: "./savedDrawings.component.html",
    // styleUrls: ['./savedDrawings.component.css'],
})
export class savedDrawingsComponent implements OnInit {
  completedDrawing;
  constructor(private drawingService: DrawingService, private router: Router, private route: ActivatedRoute, private routerExtensions: RouterExtensions) { 
  }
    ngOnInit() {
      this.makeImage();
    }
    makeImage(){
      var image = this.drawingService.source;
      this.completedDrawing = fromBase64(image);
    }
    
}
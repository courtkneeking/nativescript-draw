import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
var ImageSourceModule = require("image-source");

@Injectable({
    providedIn: "root"
    })
export class DrawingService {
public source;
public fullImg;
constructor(private router: Router){}
    fullImage(img){
        this.fullImg = img;
        console.log(this.fullImg, 'full image')
        this.router.navigate(["/drawing/user"]);
    }
    saveImage(drawing){
        var source = drawing;
        var image = ImageSourceModule.fromNativeSource(source.image);
        this.source = image.toBase64String('png');
        console.log('base 64 service', this.source);
        this.router.navigate(["/drawing/saved"]);
    }
}



// import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
// var ImageSourceModule = require("image-source");

// @Injectable({
//     providedIn: "root"
//     })
// export class DrawingService {
// public source;
// public fullImg;
// constructor(private router: Router){}
//     fullImage(img){
//         this.fullImg = img;
//         console.log(this.fullImg, 'full image')
//         this.router.navigate(["/drawing/user"]);
//     }
//     saveImage(drawing){
//         var source = drawing;
//         var image = ImageSourceModule.fromNativeSource(source.image);
//         this.source = image.toBase64String('png');
//         console.log('base 64 service', this.source);
//         this.router.navigate(["/drawing/saved"]);
//     }
// }
import { Component, ChangeDetectorRef } from "@angular/core";
import * as Facebook from "nativescript-facebook";
import * as appSettings from "tns-core-modules/application-settings";
import {fromResource} from 'tns-core-modules/image-source';
import { ActivatedRoute,  Router  } from '@angular/router';
import { RouterExtensions } from "nativescript-angular/router";
@Component({
    selector: "ns-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent {
    linkContent = null;
    photosContent = null;
    genericContent = null;
    canShowLinksShareDialog = false;
    canShowPhotosShareDialog = false;
    canShowLinksMessageDialog = false;
    canShowGenericMessageDialog = false;

    constructor(private ref: ChangeDetectorRef, 
     private router: Router, 
      private route: ActivatedRoute, 
    private routerExtensions: RouterExtensions) {
        setTimeout(() => {
            this.init();
        }, 100);
    }

    init() {
        this.linkContent = this.generateLinksShareContent();
        this.photosContent = this.generatePhotosShareContent();
        this.genericContent = this.generateGenericTemplateContent();
        this.canShowLinksShareDialog = Facebook.canShareDialogShow(this.linkContent);
        this.canShowPhotosShareDialog = Facebook.canShareDialogShow(this.photosContent);
        this.canShowLinksMessageDialog = Facebook.canMessageDialogShow(this.linkContent);
        this.canShowGenericMessageDialog = Facebook.canMessageDialogShow(this.genericContent);
    }

    onLogin(eventData: Facebook.LoginEventData) {
        if (eventData.error) {
            alert("Error during login: " + eventData.error);
        } else {
            appSettings.setString("access_token", eventData.loginResponse.token);
            this.router.navigate(["/"]);
        }
    }

    login() {
        Facebook.login((error, fbData) => {
            if (error) {
                alert("Error during login: " + error.message);
            } else {
                appSettings.setString("access_token", fbData.token);
                this.router.navigate(["/"]);
            }
        });
    }

    getCurrentAccessToken() {
        let accessToken = Facebook.getCurrentAccessToken();

        alert("Current access token: " + JSON.stringify(accessToken, null, '\t'));
    }

    generateLinksShareContent() {
        return Facebook.createShareLinksContent('https://www.nativescript.org',
            'Create Native iOS and Android Apps With JavaScript',
            {
                hashtag: '#Nativescript'
            });
    }

    generatePhotosShareContent() {
        const logoImage = fromResource('logo');
        return Facebook.createSharePhotosContent([logoImage], false, {
            hashtag: '#Nativescript'
        });
    }

    generateGenericTemplateContent() {
        return Facebook.createShareMessageGenericTemplateContent({
            element: {
                title: 'Nativescript',
                subtitle: 'Create Native iOS and Android Apps With JavaScript',
                imageUrl: 'https://d2odgkulk9w7if.cloudfront.net/images/default-source/home/how-it-works-min.png',
                button: {
                    title: 'Check Doc',
                    url: 'https://docs.nativescript.org'
                },
                defaultAction: {
                    title: 'Go HomePage',
                    url: 'https://www.nativescript.org'
                }
            },
            // it seems android have to provide a pageId, otherwise the MessageDialog just wont show
            pageID: 'testestsett',
            imageAspectRatio: Facebook.MessageGenericTemplateImageAspectRatio.Horizontal
        });
    }

    onShareDialog() {
        Facebook.showShareDialog(this.linkContent, (error, result) => {
            if (error) {
                console.error(error);
                return;
            }
            alert('Successfully shared');
        });
    }

    onShareDialogPhotos() {
        Facebook.showShareDialog(this.photosContent);
    }

    onSendDialog() {
        Facebook.showMessageDialog(this.linkContent);
    }

    onSendGenericDialog() {
        Facebook.showMessageDialog(this.genericContent);
    }
}

// import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
// import { ActivatedRoute,  Router  } from '@angular/router';
// import { RouterExtensions } from "nativescript-angular/router";


// @Component({
//     selector: "ns-login",
//     moduleId: module.id,
//     templateUrl: "./login.component.html",
//     styleUrls: ['./login.component.css'],
// })
// export class LoginComponent implements OnInit {
//   time: any = 50;
//   constructor( 
//     private router: Router, 
//     private route: ActivatedRoute, 
//     private routerExtensions: RouterExtensions) { }
//     ngOnInit() {
//       // this.startTimer();
//     }
//     startTimer(){
//       let that = this;
//       let thisTimer = setInterval(()=>{
//         if(that.time === 40){
//           clearInterval(thisTimer);
//           alert('timesup');
//         }else{
//           that.time --;
//           console.log(that.time)}
//       },1000)
//     }
// }

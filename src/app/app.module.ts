import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { LoginComponent } from "./login.component";
import { DrawingComponent } from "./drawing.component";
import { UserComponent } from "./user.component";
import { savedDrawingsComponent } from "./savedDrawings.component"

import { DrawingService } from './drawing.service';

import { NativeScriptFacebookModule } from "nativescript-facebook/angular";
import * as application from 'tns-core-modules/application';
// import { NavigationService } from "./services/navigation.service";
import { init, LoginBehavior } from "nativescript-facebook";

application.on(application.launchEvent, function (args) {
    init("1517755175027024", LoginBehavior.LoginBehaviorWeb);
});

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule, 
        NativeScriptFormsModule,
        NativeScriptFacebookModule
    ],
    declarations: [
        AppComponent,
        DrawingComponent,
        UserComponent,
        savedDrawingsComponent,
        LoginComponent
    ],
    providers: [DrawingService],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }

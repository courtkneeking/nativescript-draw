import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./login.component";
import { DrawingComponent } from "./drawing.component";
import { UserComponent } from "./user.component";
import { savedDrawingsComponent } from "./savedDrawings.component"

const routes: Routes = [
    // { path: "", redirectTo: "/drawing", pathMatch: "full" },
    { path: "", component: LoginComponent },
    { path: "drawing", component: DrawingComponent },
    { path: "drawing/user", component: UserComponent },
    { path: "drawing/saved", component: savedDrawingsComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

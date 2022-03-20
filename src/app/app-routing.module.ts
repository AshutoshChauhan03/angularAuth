import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomGuard } from './custom.guard';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpecialComponent } from './special/special.component';

const routes: Routes = [
  { path: "", redirectTo: "events", pathMatch: "full" },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "events", component: EventsComponent },
  { path: "special", component: SpecialComponent, canActivate: [CustomGuard] },
  { path: "**",  redirectTo: "login" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

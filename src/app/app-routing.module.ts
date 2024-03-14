import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CourseComponent } from './course/course.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard]}, // Home page route
  { path: '', component: LandingPageComponent} ,
  { path: 'game', component: CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

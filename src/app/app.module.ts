import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { LoginPageComponent } from './login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFirebaseApp(() => initializeApp({"projectId":"pubgolf-302c7","appId":"1:533018434791:web:4a0db349dffeb4c7de5642","storageBucket":"pubgolf-302c7.appspot.com","apiKey":"AIzaSyC9M-AQzwYgMgCFKOMy6DF2ns6uHU2_A80","authDomain":"pubgolf-302c7.firebaseapp.com","messagingSenderId":"533018434791","measurementId":"G-8X3JYCS1ZY"}))
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

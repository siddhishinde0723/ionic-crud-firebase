import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { GooglePlus } from '@ionic-native/google-plus';
//import { FieldSumPipe } from '../../../shared/pipes/fieldsum.pipe';

//firebase.initializeApp(environment.FIREBASE_CONFIG);
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports:  [CommonModule,BrowserModule,
    IonicModule.forRoot(),
     AppRoutingModule,
    AngularFireModule.initializeApp(environment.FIREBASE_CONFIG),
    AngularFireAuthModule,
  AngularFirestoreModule,],
  providers: [ Facebook,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}

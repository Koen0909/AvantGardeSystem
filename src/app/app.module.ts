import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AdminUploadComponent } from './Admin/admin-upload/admin-upload.component';
import { LoginComponent } from './login/login.component';
import { SellerRegisterComponent } from './Seller/seller-register/seller-register.component';
import { BuyerRegisterComponent } from './Buyer/buyer-register/buyer-register.component';
import { BuyerHomeComponent } from './Buyer/buyer-home/buyer-home.component';
import { BuyerAboutComponent } from './Buyer/buyer-about/buyer-about.component';
import { BuyerCollectionComponent } from './Buyer/buyer-collection/buyer-collection.component';
import { BuyerProfileComponent } from './Buyer/buyer-profile/buyer-profile.component';
import { SellerHomeComponent } from './Seller/seller-register/seller-home/seller-home.component';
import { SellerAboutComponent } from './Seller/seller-register/seller-about/seller-about.component';
import { SellerCollectionComponent } from './Seller/seller-register/seller-collection/seller-collection.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat'

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { ReactiveFormsModule } from '@angular/forms';

import { environtments } from '../environments/environtment';
import { ImageComponent } from './image/image.component';
import { ImagesComponent } from './image/images/images.component';
import { ImageListComponent } from './image/image-list/image-list.component';
import { AuthService } from './services/auth.service';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ProfileComponent } from './Seller/seller-register/profile/profile.component';

import { FormsModule } from '@angular/forms';
import { AdminAnalyticComponent } from './Admin/admin-analytic/admin-analytic.component';
import { AdminCollectionComponent } from './Admin/admin-collection/admin-collection.component';
import { AdminAboutComponent } from './Admin/admin-about/admin-about.component';
import { AdminViewScholarsComponent } from './Admin/admin-view-scholars/admin-view-scholars.component';
import { CartComponent } from './Buyer/buyer-cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { ScholarDetailsDialogComponent } from './Admin/scholar-details-dialog/scholar-details-dialog.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { AdminReportsComponent } from './Admin/admin-reports/admin-reports.component';
import { SellerViewItemsComponent } from './Seller/seller-register/seller-view-items/seller-view-items.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminHomeComponent,
    AdminUploadComponent,
    LoginComponent,
    SellerRegisterComponent,
    BuyerRegisterComponent,
    BuyerHomeComponent,
    BuyerAboutComponent,
    BuyerCollectionComponent,
    SellerHomeComponent,
    SellerAboutComponent,
    SellerCollectionComponent,
    ImageComponent,
    ImagesComponent,
    ImageListComponent,
    ProfileComponent,
    BuyerProfileComponent,
    AdminAnalyticComponent,
    AdminCollectionComponent,
    AdminAboutComponent,
    AdminViewScholarsComponent,
    CartComponent,
    PlaceOrderComponent,
    ScholarDetailsDialogComponent,
    AdminReportsComponent,
    SellerViewItemsComponent,
  
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environtments.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    FormsModule,
    MatDialogModule,
  

  ],
  providers: [AuthService, provideAnimationsAsync()],
  // provideClientHydration(),
  // provideFirebaseApp(() => initializeApp({"projectId":"avant-garde-system","appId":"1:538060466631:web:bbef9e153bc464b64991e2","storageBucket":"avant-garde-system.appspot.com","apiKey":"AIzaSyAK6XhNfpX4KzahT2J2g0JYJ1PzFwDp9VY","authDomain":"avant-garde-system.firebaseapp.com","messagingSenderId":"538060466631","measurementId":"G-BV3VNKZQY1"})),
  // provideAuth(() => getAuth()),
  // provideFirestore(() => getFirestore())
  bootstrap: [AppComponent]
})
export class AppModule { }

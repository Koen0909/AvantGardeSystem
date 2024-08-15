import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './Admin/admin-home/admin-home.component';
import { AdminUploadComponent } from './Admin/admin-upload/admin-upload.component';
import { SellerRegisterComponent } from './Seller/seller-register/seller-register.component';
import { SellerAboutComponent } from './Seller/seller-register/seller-about/seller-about.component';
import { SellerCollectionComponent } from './Seller/seller-register/seller-collection/seller-collection.component';
import { SellerHomeComponent } from './Seller/seller-register/seller-home/seller-home.component';
import { BuyerRegisterComponent } from './Buyer/buyer-register/buyer-register.component';
import { BuyerAboutComponent } from './Buyer/buyer-about/buyer-about.component';
import { BuyerCollectionComponent } from './Buyer/buyer-collection/buyer-collection.component';
import { BuyerProfileComponent } from './Buyer/buyer-profile/buyer-profile.component';
import { BuyerHomeComponent } from './Buyer/buyer-home/buyer-home.component';
import { ImageComponent } from './image/image.component';
import { ImageListComponent } from './image/image-list/image-list.component';
import { ImagesComponent } from './image/images/images.component';
import { ProfileComponent } from './Seller/seller-register/profile/profile.component';
import { AdminAnalyticComponent } from './Admin/admin-analytic/admin-analytic.component';
import { AdminCollectionComponent } from './Admin/admin-collection/admin-collection.component';
import { AdminViewScholarsComponent } from './Admin/admin-view-scholars/admin-view-scholars.component';
import { CartComponent } from './Buyer/buyer-cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { AdminReportsComponent } from './Admin/admin-reports/admin-reports.component';
import { SellerViewItemsComponent } from './Seller/seller-register/seller-view-items/seller-view-items.component';

const routes: Routes = [
  {path: '',redirectTo:'login' ,pathMatch:'full'}, //image/upload

  {path: 'login', component: LoginComponent},
  {path: 'admin-dashbaord', component: AdminDashboardComponent},
  {path: 'admin-home', component: AdminHomeComponent},
  {path: 'admin-upload', component: AdminUploadComponent},
  {path: 'seller-register', component: SellerRegisterComponent},
  {path: 'seller-home', component: SellerHomeComponent},
  {path: 'seller-collection', component: SellerCollectionComponent},
  {path: 'seller-about', component: SellerAboutComponent},
  {path: 'buyer-register', component: BuyerRegisterComponent},
  {path: 'buyer-about', component: BuyerAboutComponent},
  {path: 'buyer-collection', component: BuyerCollectionComponent},
  {path: 'buyer-home', component: BuyerHomeComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'buyer-profile', component: BuyerProfileComponent},
  {path: 'admin-analytic', component: AdminAnalyticComponent},
  {path: 'admin-collection', component: AdminCollectionComponent,},
  {path: 'viewScholars', component: AdminViewScholarsComponent},
  {path: 'buyer-cart', component: CartComponent},
  {path: 'place-order', component: PlaceOrderComponent},
  {path: 'admin-reports', component: AdminReportsComponent},
  {path: 'view-items-seller', component: SellerViewItemsComponent},
//   {
//     path: 'image', component: ImagesComponent,children: [
//         {path: 'upload', component: ImageComponent},
//         {path: 'list', component: ImageListComponent}
//   ]
// }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

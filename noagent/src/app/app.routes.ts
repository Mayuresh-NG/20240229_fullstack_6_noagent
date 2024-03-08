import { DetailSingleComponent } from './components/detail-single/detail-single.component';
import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { MyWishlistComponent } from './components/my-wishlist/my-wishlist.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { RentYourPropertyComponent } from './components/rent-your-property/rent-your-property.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { SellYourPropertyComponent } from './components/sell-your-property/sell-your-property.component';
import { ViewPropertiesComponent } from './components/view-properties/view-properties.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PropertyDetailsMainScreenComponent } from './components/property_details/property-details-main-screen/property-details-main-screen.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SellRentPageComponent } from './components/sell-rent-page/sell-rent-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'sell-rent',
    component: SellRentPageComponent,
    children: [
      { path: 'sell', component: SellYourPropertyComponent },
      { path: 'rent', component: RentYourPropertyComponent },
    ],
  },
  { path: 'propertydetails', component: PropertyDetailsMainScreenComponent },
  { path: 'properties', component: MyPropertiesComponent },
  { path: 'wishlist', component: MyWishlistComponent },
  { path: 'propertylist', component: PropertyListComponent },
  { path: 'rentyourproperty', component: RentYourPropertyComponent },
  { path: 'requestlist', component: RequestListComponent },
  { path: 'sellyourproperty', component: SellYourPropertyComponent },
  { path: 'viewproperty', component: ViewPropertiesComponent },
  { path: 'forgotpassword', component: ForgotPasswordComponent },
  ,
  { path: 'resetpassword', component: ResetPasswordComponent },
  { path: 'singledetail', component: DetailSingleComponent },
];

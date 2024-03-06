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

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'property_details',component:PropertyDetailsMainScreenComponent},
    {path:'',component:HomePageComponent},
    {path:'properties',component:MyPropertiesComponent},
    {path:'wishlist',component:MyWishlistComponent},
    {path:'propertylist', component:PropertyListComponent},
    {path:'rentyourproperty', component:RentYourPropertyComponent},
    {path:'requestlist', component:RequestListComponent},
    {path:'sellyourproperty', component:SellYourPropertyComponent},
    {path:'viewproperty', component:ViewPropertiesComponent},
    {path:'forgotpassword',component:ForgotPasswordComponent}
];

import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { MyWishlistComponent } from './components/my-wishlist/my-wishlist.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { RentYourPropertyComponent } from './components/rent-your-property/rent-your-property.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { SellYourPropertyComponent } from './components/sell-your-property/sell-your-property.component';

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'properties',component:MyPropertiesComponent},
    {path:'wishlist',component:MyWishlistComponent},
    {path:'propertylist', component:PropertyListComponent},
    {path:'rentyourproperty', component:RentYourPropertyComponent},
    {path:'requestlist', component:RequestListComponent},
    {path:'sellyourproperty', component:SellYourPropertyComponent}
];

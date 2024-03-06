import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
import { MyWishlistComponent } from './components/my-wishlist/my-wishlist.component';

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'properties',component:MyPropertiesComponent},
    {path:'wishlist',component:MyWishlistComponent},
];

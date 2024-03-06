import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { PropertyDetailsMainScreenComponent } from './components/property_details/property-details-main-screen/property-details-main-screen.component';

export const routes: Routes = [
    {path:'',component:HomePageComponent},
    {path:'property_details',component:PropertyDetailsMainScreenComponent}
];

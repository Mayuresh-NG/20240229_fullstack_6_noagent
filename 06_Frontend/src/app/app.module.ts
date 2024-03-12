import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RequestService } from './services/request.service';
// import { FooterComponent } from './components/footer/footer.component';
// import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
// import { HomePageComponent } from './components/home-page/home-page.component';
// import { LoginComponent } from './components/login/login.component';
// import { LoginPopupComponent } from './components/login-popup/login-popup.component';
// import { MyPropertiesComponent } from './components/my-properties/my-properties.component';
// import { MyWishlistComponent } from './components/my-wishlist/my-wishlist.component';
// import { NavbarComponent } from './components/navbar/navbar.component';
// import { ProfileComponent } from './components/profile/profile.component';
// import { PropertyDetailsMainScreenComponent } from './components/property_details/property-details-main-screen/property-details-main-screen.component';
// import { AmenitiesComponent } from './components/property_details/amenities/amenities.component';
// import { DescriptionComponent } from './components/property_details/description/description.component';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [RequestService],
//   bootstrap: [AppComponent]
})
export class AppModule { }

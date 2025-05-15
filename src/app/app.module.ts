import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProducteditComponent } from './product-edit/product-edit.component';  
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ProductService } from './services/product.service';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptorProviders } from './auth.interceptor';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component'; // ✅ Interceptor provider
import { ToastrModule } from 'ngx-toastr';
import { BookingComponent } from './booking/booking.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ProducteditComponent,
    ProductDetailComponent,
    CartComponent,
    CheckoutComponent,
    BookingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzNotificationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({    // ← Configuration globale
      positionClass: 'toast-top-center',
      timeOut: 3000,
      preventDuplicates: true
    }),
    
  ],
  providers: [
    provideClientHydration(),
    ProductService,
    authInterceptorProviders ,// ✅ Registering the interceptor here only
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

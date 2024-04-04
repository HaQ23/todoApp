import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { SharedModule } from './modules/shared/shared.module';
import localePL from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { AuthModule } from './modules/core/components/auth/auth.module';
import { HomeModule } from './modules/home/home.module';
registerLocaleData(localePL);
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    AuthModule,
    HomeModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pl' }],
  bootstrap: [AppComponent],
})
export class AppModule {}

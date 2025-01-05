import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/app-http.interceptor';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import fr from '@angular/common/locales/fr';
import {  NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { SharedModule } from './shared/shared.module';
import { MainBottomNavBarComponent } from './shared/components/main-bottom-nav-bar/main-bottom-nav-bar.component';
import { MainFooterComponent } from './shared/components/main-footer/main-footer.component';
import { MainNavBarComponent } from './shared/components/main-nav-bar/main-nav-bar.component';
import { MainSearchBarComponent } from './shared/components/main-search-bar/main-search-bar.component';

registerLocaleData(en);
registerLocaleData(fr);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [
    AppComponent,
    MainFooterComponent,
    MainNavBarComponent
],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule // Import SharedModule here
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NZ_ICONS, useValue: icons },
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

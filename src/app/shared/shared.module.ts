import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxLoadingModule } from 'ngx-loading';
import { DateFormatPipe } from './date-formater.pipe';
import { RoundPipe } from './round.pipe';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { GoogleMapsModule } from '@angular/google-maps';
import { MainSearchBarComponent } from './components/main-search-bar/main-search-bar.component';
import { MainBottomNavBarComponent } from './components/main-bottom-nav-bar/main-bottom-nav-bar.component';


@NgModule({
  declarations: [
    DateFormatPipe, // Shared pipe
    RoundPipe,
    MainSearchBarComponent,
    MainBottomNavBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzAutocompleteModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    NzAvatarModule,
    NzMessageModule,
    NzCardModule,
    NzTabsModule,
    NzSwitchModule,
    NzModalModule,
    NzPopconfirmModule,
    NgxPaginationModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBadgeModule,
    NzDrawerModule,
    NzIconModule,
    NzImageModule,
    NzTagModule,
    NgxLoadingModule.forRoot({}),
    GoogleMapsModule,
    NzProgressModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzAutocompleteModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzTableModule,
    NzButtonModule,
    NzDropDownModule,
    NzAvatarModule,
    NzMessageModule,
    NzCardModule,
    NzTabsModule,
    NzSwitchModule,
    NzModalModule,
    NzPopconfirmModule,
    NgxPaginationModule,
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzBadgeModule,
    NgxLoadingModule,
    NzDrawerModule,
    NzIconModule,
    NzImageModule,
    NzTagModule,
    GoogleMapsModule,
    MainSearchBarComponent,
    NzProgressModule,
    DateFormatPipe,
    MainBottomNavBarComponent


  ],
  providers: [DatePipe, DateFormatPipe]
})
export class SharedModule {}

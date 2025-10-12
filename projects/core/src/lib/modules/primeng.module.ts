import { NgModule } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { DrawerModule } from 'primeng/drawer';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

const primengModules = [
  MenubarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  DropdownModule,
  InputNumberModule,
  DialogModule,
  MultiSelectModule,
  DrawerModule,
  RippleModule,
  ToastModule
];

@NgModule({
  imports: [
    ...primengModules
  ],
  providers: [MessageService],
  exports: primengModules
})
export class PrimengModule {}
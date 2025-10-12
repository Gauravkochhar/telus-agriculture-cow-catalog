import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private messageService: MessageService) {}

  success(summary: string, detail?: string, life: number = 3000) {
    this.show('success', summary, detail, life);
  }

  error(summary: string, detail?: string, life: number = 3000) {
    this.show('error', summary, detail, life);
  }

  info(summary: string, detail?: string, life: number = 3000) {
    this.show('info', summary, detail, life);
  }

  warn(summary: string, detail?: string, life: number = 3000) {
    this.show('warn', summary, detail, life);
  }

  private show(severity: 'success' | 'info' | 'warn' | 'error', summary: string, detail?: string, life: number = 3000) {
    const message = { severity, summary, detail, life };
    this.messageService.add(message);
  }
}
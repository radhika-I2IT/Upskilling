import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-app-dialog-component',
  standalone: true,
  imports: [],
  templateUrl: './app-dialog-component.html',
  styleUrl: './app-dialog-component.css',
})
export class AppDialogComponent {

  @ViewChild('dialog')
  dialog!: ElementRef<HTMLDialogElement>;

  open(): void {
    this.dialog.nativeElement.showModal();
  }

  close(): void {
    this.dialog.nativeElement.close();
  }

}
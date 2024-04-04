import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef,
  TemplateRef,
  OnInit,
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Event } from '@angular/router';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() modal_title!: String;
  @Input() modal_text!: string;
  @Output() close = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef
  ) {}

  @ViewChild('templatePortalContent', { static: true })
  templatePortalContent!: TemplateRef<any>;
  overlayRef!: OverlayRef;
  ngOnInit(): void {
    this.openOverlay();
  }
  openOverlay() {
    const overlayConfig = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-dark-backdrop',
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
    });

    this.overlayRef = this.overlay.create(overlayConfig);

    const portal = new TemplatePortal(
      this.templatePortalContent,
      this.viewContainerRef
    );
    this.overlayRef.attach(portal);
  }
  closeOverlay() {
    this.overlayRef.detach();
  }
  closeModal() {
    this.close.emit();
    this.closeOverlay();
  }
  deleteTask() {
    this.delete.emit();
    this.closeOverlay();
  }
}

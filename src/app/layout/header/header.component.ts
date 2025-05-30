import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuOpen = false;

  @ViewChild('menuRef') menuRef!: ElementRef;

  // Method to toggle the menu (opens or closes it)
  toggleMenu(event: Event) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
  }

  // Close the dropdown when resizing to desktop
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    if (window.innerWidth > 768) {
      if (this.menuOpen) {
        this.menuOpen = false;
      }
    }
  }

  // Close on scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.menuOpen) {
      this.menuOpen = false;
    }
  }

  // Close on clicking outside the menu
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (
      this.menuOpen &&
      this.menuRef &&
      !this.menuRef.nativeElement.contains(event.target)
    ) {
      this.menuOpen = false;
    }
  }
}

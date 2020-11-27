import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean  = false
  showSubmenu1: boolean = false
  showSubmenu2: boolean = false
  showSubmenu3: boolean = false
  showSubmenu4: boolean = false
  showSubmenu5: boolean = false
  showSubmenu6: boolean = false
  showSubmenu7: boolean = false
  showSubmenu8: boolean = false
  showSubmenu9: boolean = false
  showSubmenu10: boolean = false
  showSubmenu11: boolean = false
  isShowing = false;
  showSubSubMenu: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  logout() {
    sessionStorage.clear()
    this.router.navigate(['/superadmin/login'])
  }


}

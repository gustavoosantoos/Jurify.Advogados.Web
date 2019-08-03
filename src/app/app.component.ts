import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'jurify-web';
  currentRoute: string;
  
  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.currentRoute = e.url;
      }
    });
  }
}

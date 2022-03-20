import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomSnackbarService } from '../custom-snack-bar.service';
import { EventsService } from '../events.service';

@Component({
  selector: 'app-special',
  templateUrl: './special.component.html',
  styleUrls: ['./special.component.scss']
})
export class SpecialComponent implements OnInit {

  specials: any = [{}];

  constructor(private _events: EventsService, private router: Router, private customSnackBar: CustomSnackbarService) { 
    this.getSpecials();
  }

  ngOnInit(): void {
  }

  getSpecials() {
    this._events.getSpecials().subscribe((data)=> {
      this.specials = data;
    }, 
    (err) => {
      this.customSnackBar.open("Log In first !", 'Close')
      this.router.navigate(['/login'])
    })
  }

}

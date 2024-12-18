import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { SecurityService } from 'src/app/services/security.service';
import { ROUTES } from "../../components/sidebar/sidebar.component";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  user: User;
  subscription: Subscription;
  constructor(
    location: Location,
    private securityService: SecurityService
  ) {}

  ngOnInit() {
     this.listTitles = ROUTES.filter((listTitle) => listTitle);
     this.subscription = this.securityService.getUser().subscribe((data) => {
       this.user = data;
     });
     }
}

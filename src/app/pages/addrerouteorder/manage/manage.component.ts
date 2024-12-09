import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Addrerouteorder } from 'src/app/models/addrerouteorder.model';
import { AddrerouteorderService } from 'src/app/services/addrerouteorder.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

 

 
  mode:number; //1->View, 2->Create, 3->Update
  AddreRouteOrder : Addrerouteorder;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(private activateRoute:ActivatedRoute,
              private AddreRouteOrderService: AddrerouteorderService,
              private router:Router,
              private theFormBuilder: FormBuilder

  ) { 
    this.mode = 1;
    this.AddreRouteOrder = {id:0, address_id:0, route_id:0};
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("address_id").disable();
      this.theFormGroup.get("route_id").disable();
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.AddreRouteOrder.id = this.activateRoute.snapshot.params.id;
      this.getAddreRouteOrder(this.AddreRouteOrder.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.AddreRouteOrder));
    this.AddreRouteOrderService.create(this.AddreRouteOrder).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["addreRouteOrders/list"]);
    });
  }

  update() {
  
    console.log(JSON.stringify(this.AddreRouteOrder));
    this.AddreRouteOrderService.update(this.AddreRouteOrder).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["addreRouteOrders/list"]);
    });
  }

  //aqui se arma la data
  getAddreRouteOrder(id: number) {
    this.AddreRouteOrderService.view(id).subscribe((data) => {
      this.AddreRouteOrder = data;
      
  
      this.theFormGroup.patchValue({
        id: this.AddreRouteOrder.id,
        address_id: this.AddreRouteOrder.address_id,
        route_id: this.AddreRouteOrder.route_id,
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.AddreRouteOrder.id || 0],
      address_id: [
        this.AddreRouteOrder.address_id || 0, 
        [
          Validators.required,
          Validators.pattern("^[0-9]+$")
        ]
      ],
      route_id: [
        this.AddreRouteOrder.route_id || 0, 
        [
          Validators.required,
          Validators.pattern("^[0-9]+$")
        ]
      ],
    });
  }

  //aqui nos indica que regla molesto
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  

  }
  
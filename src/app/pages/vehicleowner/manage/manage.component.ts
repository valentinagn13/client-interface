import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicleowner } from 'src/app/models/vehicleowner.model';
import { VehicleownerService } from 'src/app/services/vehicleowner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  mode: number; //1->View, 2->Create, 3->Update
  vehicleOwners: Vehicleowner;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private vehicleOwnerService: VehicleownerService,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.mode = 1;
    this.vehicleOwners = {
      id: 0,
      acquisition_date: new Date(),
      ownership_percentage: 0,
      owner_id: 0,
      vehicle_id: 0,
    };
    this.trySend = false;
  }

  ngOnInit(): void {
    this.configFormGroup();
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.theFormGroup.get("id").disable();
      this.theFormGroup.get("acquisition_date").disable();
      this.theFormGroup.get("ownership_percentage").disable();
      this.theFormGroup.get("owner_id").disable();
      this.theFormGroup.get("vehicle_id").disable();
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
      this.theFormGroup.get("id").disable();
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
      this.theFormGroup.get("id").disable();
    }
    if (this.activateRoute.snapshot.params.id) {
      this.vehicleOwners.id = this.activateRoute.snapshot.params.id;
      this.getVehicleOwner(this.vehicleOwners.id);
    }
  }

  create() {
    console.log(JSON.stringify(this.vehicleOwners));
    this.vehicleOwnerService.create(this.vehicleOwners).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["vehicleOwners/list"]);
    });
  }

  update() {
    const fechaVencimiento = this.theFormGroup.get("due_date")?.value;
    const fechaVenciminetoDate = new Date(fechaVencimiento);

    console.log(JSON.stringify(this.vehicleOwners));
    this.vehicleOwnerService.update(this.vehicleOwners).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["vehicleOwners/list"]);
    });
  }

  //aqui se arma la data
  getVehicleOwner(id: number) {
    this.vehicleOwnerService.view(id).subscribe((data) => {
      this.vehicleOwners = data;
      
      // Format due_date if it's a string or Date
      const formattedDueDate = this.vehicleOwners.acquisition_date 
        ? new Date(this.vehicleOwners.acquisition_date).toISOString().split('T')[0] 
        : '';
  
      this.theFormGroup.patchValue({
        id: this.vehicleOwners.id,
        acquisition_date: formattedDueDate,
        ownership_percentage: this.vehicleOwners.ownership_percentage,
        owner_id: this.vehicleOwners.owner_id,
        vehicle_id: this.vehicleOwners.vehicle_id
      });
    });
  }

  //OJO-----------------------------
  //aqui definimos las reglas
  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      id: [this.vehicleOwners.id || 0],
      acquisition_date: [this.vehicleOwners.acquisition_date || '', Validators.required],
      ownership_percentage: [
        this.vehicleOwners.ownership_percentage || 0, 
        [
          Validators.required,
          Validators.min(0),
          Validators.max(100),
          Validators.pattern("^[0-9]+$")
        ]
      ],
      owner_id: [
        this.vehicleOwners.owner_id || 0, 
        [
          Validators.required,
          Validators.pattern("^[0-9]+$")
        ]
      ],
      vehicle_id: [
        this.vehicleOwners.vehicle_id || 0, 
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

  incrementPercentage() {
    const currentValue = this.vehicleOwners.ownership_percentage || 0;
    if (currentValue < 100) {
      this.vehicleOwners.ownership_percentage = currentValue + 1;
      this.theFormGroup.get('ownership_percentage')?.setValue(this.vehicleOwners.ownership_percentage);
    }
  }
  
  decrementPercentage() {
    const currentValue = this.vehicleOwners.ownership_percentage || 0;
    if (currentValue > 0) {
      this.vehicleOwners.ownership_percentage = currentValue - 1;
      this.theFormGroup.get('ownership_percentage')?.setValue(this.vehicleOwners.ownership_percentage);
    }
  }
  
  

}

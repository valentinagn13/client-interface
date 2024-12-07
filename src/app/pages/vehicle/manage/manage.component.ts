import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update
  vehicles : Vehicle;

  constructor(private activateRoute:ActivatedRoute,
              private vehiclesService: VehicleService,
              private router:Router,

  ) { 
    this.mode = 1;
    this.vehicles = {id:0, license_plate:'', model:'', capacity:0, cargo_type:''};
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id){
      this.vehicles.id = this.activateRoute.snapshot.params.id;
      this.getVehicle(this.vehicles.id);
    }

  }

  create(){  
    console.log(JSON.stringify(this.vehicles));
    this.vehiclesService.create(this.vehicles).subscribe(data=>{
      Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["vehicles/list"]); 
    })
    
  }

  update(){
    console.log(JSON.stringify(this.vehicles));
    this.vehiclesService.update(this.vehicles).subscribe(data=>{
      Swal.fire("Actualizado"," se ha actualizado exitosa mente", "success")//titulo a la alerta
      this.router.navigate(["vehicles/list"]); 
    })
    
  }


    //aqui se arma la data
    getVehicle(id:number){
      this.vehiclesService.view(id).subscribe(data=>{
        this.vehicles = data;        
        console.log(JSON.stringify(this.vehicles));
      });
    }
}

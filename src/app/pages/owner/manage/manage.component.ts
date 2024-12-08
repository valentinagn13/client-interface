import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Owner } from 'src/app/models/owner.model';
import { OwnerService } from 'src/app/services/owner.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  
  mode:number; //1->View, 2->Create, 3->Update
  owners : Owner;

  constructor(private activateRoute:ActivatedRoute,
              private vehiclesService: OwnerService,
              private router:Router,

  ) { 
    this.mode = 1;
    this.owners = {id:0, user_id:'', phone_number:0 , driver_id:0};
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
      this.owners.id = this.activateRoute.snapshot.params.id;
      this.getOwner(this.owners.id);
    }

  }

  create(){  
    console.log(JSON.stringify(this.owners));
    this.vehiclesService.create(this.owners).subscribe(data=>{
      Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["owners/list"]); 
    })
    
  }

  update(){
    console.log(JSON.stringify(this.owners));
    this.vehiclesService.update(this.owners).subscribe(data=>{
      Swal.fire("Actualizado"," se ha actualizado exitosa mente", "success")//titulo a la alerta
      this.router.navigate(["owners/list"]); 
    })
    
  }


    //aqui se arma la data
    getOwner(id:number){
      this.vehiclesService.view(id).subscribe(data=>{
        this.owners = data;   
        //console.log(data['cliente']+ "machio aqui estoy");
             
        console.log(JSON.stringify(this.owners));
      });
    }

}

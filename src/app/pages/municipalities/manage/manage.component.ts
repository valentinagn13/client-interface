import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  mode:number; //1->View, 2->Create, 3->Update
  municipality : Municipality;

  constructor(private activateRoute:ActivatedRoute,
              private municipalityService:MunicipalityService,
              private router:Router,

  ) { 
    this.mode = 1;
    this.municipality = {id:0, name:'', description:'', surface:0, population:0, postalCode:'', department_id:0};
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
      this.municipality.id = this.activateRoute.snapshot.params.id;
      this.getMunicipality(this.municipality.id);
    }

  }

  create(){  
    console.log(JSON.stringify(this.municipality));
    this.municipalityService.create(this.municipality).subscribe(data=>{
      Swal.fire("Creado"," se ha creado exitosa mente", "success")//titulo a la alerta
      this.router.navigate(["municipalities/list"]); 
    })
    
  }

  update(){
    console.log(JSON.stringify(this.municipality));
    this.municipalityService.update(this.municipality).subscribe(data=>{
      Swal.fire("Actualizado"," se ha actualizado exitosa mente", "success")//titulo a la alerta
      this.router.navigate(["municipalities/list"]); 
    })
    
  }


    //aqui se arma la data
    getMunicipality(id:number){
      this.municipalityService.view(id).subscribe(data=>{
        this.municipality = data;     
        console.log(JSON.stringify(this.municipality));
      });
    }
}

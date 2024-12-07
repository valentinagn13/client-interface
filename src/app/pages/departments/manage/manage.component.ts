import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  mode:number; //1->View, 2->Create, 3->Update
  department : Department;

  constructor(private activateRoute:ActivatedRoute,
              private deparmentService:DepartmentService,
              private router:Router,

  ) { 
    this.mode = 1;
    this.department = {id:0, name:'', description:'', city_capital_id:0, municipalities:0, surface:0, population:0, phone_prefix:'', country_id:0, region_id:0};
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
      this.department.id = this.activateRoute.snapshot.params.id;
      this.getDepartment(this.department.id);
    }

  }

  create(){  
    console.log(JSON.stringify(this.department));
    this.deparmentService.create(this.department).subscribe(data=>{
      Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["departments/list"]); 
    })
    
  }

  update(){
    console.log(JSON.stringify(this.department));
    this.deparmentService.update(this.department).subscribe(data=>{
      Swal.fire("Actualizado"," se ha actualizado exitosa mente", "success")//titulo a la alerta
      this.router.navigate(["departments/list"]); 
    })
    
  }


    //aqui se arma la data
    getDepartment(id:number){
      this.deparmentService.view(id).subscribe(data=>{
        this.department = data;    
        console.log(JSON.stringify(this.department));
      });
    }

}

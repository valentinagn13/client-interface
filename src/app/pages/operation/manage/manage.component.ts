import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'src/app/models/operation.model';
import { OperationService } from 'src/app/services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

 
  mode:number; //1->View, 2->Create, 3->Update
  
  operations : Operation;

  constructor(private activateRoute:ActivatedRoute,
              private operationsService: OperationService,
              private router:Router,

  ) { 
    this.mode = 1;
    this.operations = {id:0, start_date: new Date(), end_date: new Date(), municipality_id:0, vehicle_id:0};
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
      this.operations.id = this.activateRoute.snapshot.params.id;
      this.getOperation(this.operations.id);
    }

  }

  create(){  
    console.log(JSON.stringify(this.operations));
    this.operationsService.create(this.operations).subscribe(data=>{
      Swal.fire("Creado"," se ha creado exitosa mente", "success")//tirulo a la alerta
      this.router.navigate(["operations/list"]); 
    })
    
  }

  update(){
    console.log(JSON.stringify(this.operations));
    this.operationsService.update(this.operations).subscribe(data=>{
      Swal.fire("Actualizado"," se ha actualizado exitosa mente", "success")//titulo a la alerta
      this.router.navigate(["operations/list"]); 
    })
    
  }


    //aqui se arma la data
    getOperation(id:number){
      this.operationsService.view(id).subscribe(data=>{
        this.operations = data;        
        console.log(JSON.stringify(this.operations));
      });
    }

}

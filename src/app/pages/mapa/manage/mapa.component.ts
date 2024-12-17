import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { VehicleService } from "src/app/services/vehicle.service";
import { Vehicle } from "src/app/models/vehicle.model";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-mapa",
  templateUrl: "./mapa.component.html",
  styleUrls: ["./mapa.component.css"],
})
export class MapaComponent implements OnInit {
  private map!: L.Map;
  private movingMarker!: L.Marker;
  vehicles: Vehicle;

  // Coordenadas iniciales y finales
  private coordInicial: [number, number] = [0, 0];
  private coordFinal: [number, number] = [0, 0];

  constructor(
    private vehiclesService: VehicleService,
    private route: ActivatedRoute, // Importar ActivatedRoute
    private router: Router
  ) {
    this.vehicles = {
      id: 0,
      license_plate: "",
      model: "",
      capacity: 0,
      cargo_type: "",
      latitud_inicial: 0,
      latitud_final: 0,
      longitud_inicial: 0,
      longitud_final: 0,
    };
  }

  ngOnInit(): void {
    // Obtener el parámetro 'id' de la URL
    const vehicleId = Number(this.route.snapshot.paramMap.get("id")); // o usar paramMap
    if (!isNaN(vehicleId)) {
      this.getVehicle(vehicleId);
    } else {
      console.error("ID de vehículo no válido en la URL.");
    }
  }

  getVehicle(id: number): void {
    this.vehiclesService.view(id).subscribe((data) => {
      this.vehicles = data;

      // Asignar las coordenadas desde los datos obtenidos
      this.coordInicial = [
        Number(this.vehicles.latitud_inicial),
        Number(this.vehicles.longitud_inicial),
      ];
      this.coordFinal = [
        Number(this.vehicles.latitud_final),
        Number(this.vehicles.longitud_final),
      ];

      console.log("Coooordenadas iniciales:", this.coordInicial);
      console.log("Coooordenadas finales:", this.coordFinal);

      // Inicializar el mapa con las coordenadas asignadas
      this.initMap();
      this.moverMarcadorProgresivamente(
        this.coordInicial,
        this.coordFinal,
        180,
        900
      );
    });
  }

  private initMap(): void {
    this.map = L.map("map").setView(this.coordInicial, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(this.map);

    const startIcon = L.icon({
      iconUrl: "assets/img/icons/alfiler.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const endIcon = L.icon({
      iconUrl: "assets/img/icons/alfiler.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    L.marker(this.coordInicial, { icon: startIcon })
      .addTo(this.map)
      .bindPopup("Punto Inicial")
      .openPopup();

    L.marker(this.coordFinal, { icon: endIcon })
      .addTo(this.map)
      .bindPopup("Punto Final");

    this.movingMarker = L.marker(this.coordInicial).addTo(this.map);
    this.movingMarker.bindPopup("Haciendo la ruta").openPopup();
  }
  private moverMarcadorProgresivamente(
    coordInicial: [number, number],
    coordFinal: [number, number],
    pasos: number,
    delay: number
  ): void {
    let [latActual, lonActual] = coordInicial;
    const [latFinal, lonFinal] = coordFinal;

    const incrementoLat = (latFinal - latActual) / pasos;
    const incrementoLon = (lonFinal - lonActual) / pasos;
    let pasoActual = 0;

    const intervalo = setInterval(() => {
      if (pasoActual >= pasos) {
        clearInterval(intervalo);
        this.movingMarker.setLatLng([latFinal, lonFinal]);
        this.movingMarker.bindPopup("Llegada al destino").openPopup();
      } else {
        latActual += incrementoLat;
        lonActual += incrementoLon;
        this.movingMarker.setLatLng([latActual, lonActual]);
        pasoActual++;
      }
    }, delay);
  }
}

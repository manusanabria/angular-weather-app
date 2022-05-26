import { Component, OnInit } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  urlImagen =
    'https://images.squarespace-cdn.com/content/v1/5572b7b4e4b0a20071d407d4/1487090874274-FH2ZNWOTRU90UAF5TA2B/Weather+Targeting?format=300w';
  ciudad = '';
  temperatura = 0;
  humedad = 0;
  query = false;
  clima = '';
  loading = false;
  mostrarError = false;

  constructor(private _climaService: ClimaService) {}

  ngOnInit(): void {}

  obternerClima() {
    this.query = false;
    this.loading = true;
    this._climaService.getClima(this.ciudad).subscribe(
      (data) => {
        this.loading = false;
        this.query = true;
        this.temperatura = data.main.temp - 273;
        this.humedad = data.main.humidity;
        this.clima = data.weather[0].main;
      },
      (error) => {
        console.log(error);
        this.loading = false;
        this.error();
      }
    );
  }

  error() {
    this.mostrarError = true;
    setTimeout(() => {
      this.mostrarError = false;
      this.ciudad = '';
    }, 3000);
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  weatherdata: any = {};
  searchQuery: string = '';
  apiKey: string = '15d34160dfed4a01c7efa66d1f47eef3'; // Your OpenWeatherMap API key

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Initialize with a default city
    this.searchWeather('London');
  }

  searchWeather(city: string = this.searchQuery) {
    if (city) {
      this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`)
        .subscribe(
          (data: any) => {
            this.setWeather(data);
          },
          (error) => {
            console.error('Error fetching weather data:', error);
            this.weatherdata = {};
          }
        );
    }
  }

  setWeather(data: any){
    this.weatherdata = {
      name: data.name,
      temp_celcius: (data.main.temp - 273.15).toFixed(0),
      temp_min: (data.main.temp_min - 273.15).toFixed(0),
      temp_max: (data.main.temp_max - 273.15).toFixed(0),
      feels_like: (data.main.feels_like - 273.15).toFixed(0),
      humidity: data.main.humidity,
      isDay: this.isDay(data.sys.sunset)
    };
  }

  isDay(sunset: number): boolean {
    return new Date().getTime() < new Date(sunset * 1000).getTime();
  }
}


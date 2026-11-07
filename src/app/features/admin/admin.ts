import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CelestialBody } from '../../core/models/celestial-body';
import { AstronomyService } from '../../core/services/astronomy';

@Component({
  imports: [],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin implements OnInit {
  private astronomyService = inject(AstronomyService);
  private router = inject(Router);

  corposCelestes: CelestialBody[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadCorposCelestes();
  }

  loadCorposCelestes(): void {
    this.loading = true;
    this.errorMessage = '';
    this.astronomyService.getAll().subscribe({
      next: (response) => {
        this.corposCelestes = response;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar os corpos celestes';
        this.loading = false;
      },
    });
  }
}
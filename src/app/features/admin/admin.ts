import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CelestialBody } from '../../core/models/celestial-body';
import { AstronomyService } from '../../core/services/astronomy';

@Component({
  imports: [RouterLink, CommonModule],
  selector: 'app-admin',
  styleUrl: './admin.css',
  templateUrl: './admin.html',
})
export class Admin implements OnInit {
  private astronomyService = inject(AstronomyService);
  private router = inject(Router);

  corposCelestes = signal<CelestialBody[]>([]);
  loading = signal(true);
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.loadCorposCelestes();
  }

  loadCorposCelestes(): void {
    this.loading.set(true);
    this.errorMessage = '';
    this.astronomyService.getAll().subscribe({
      next: (response) => {
        this.corposCelestes.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar os corpos celestes';
        this.loading.set(false);
      },
    });
  }

  edit(id?: string): void {
    if (id) {
      this.router.navigate(['/manutencao-corpo-celeste'], {
        queryParams: { id },
      });
    }
  }

  remove(id?: string): void {
    if (id && confirm('Tem certeza que deseja excluir?')) {
      this.astronomyService.delete(id).subscribe({
        next: () => {
          this.successMessage = 'Corpo celeste removido com sucesso';
          this.loadCorposCelestes();
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        error: () => {
          this.errorMessage = 'Erro ao remover corpo celeste';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        },
      });
    }
  }
}
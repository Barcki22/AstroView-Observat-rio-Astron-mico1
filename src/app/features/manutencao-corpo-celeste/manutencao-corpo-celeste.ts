import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AstronomyService } from '../../core/services/astronomy';
import { CelestialBody } from '../../core/models/celestial-body';

@Component({
  selector: 'app-manutencao-corpo-celeste',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './manutencao-corpo-celeste.html',
  styleUrls: ['./manutencao-corpo-celeste.css'],
})
export class ManutencaoCorpoCeleste implements OnInit {
  private fb = inject(FormBuilder);
  private astronomyService = inject(AstronomyService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form!: FormGroup;
  corpoCelesteId: string | null = null;
  loading = false;
  saving = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void {
    this.initForm();
    this.route.queryParamMap.subscribe((params) => {
      this.corpoCelesteId = params.get('id');
      if (this.corpoCelesteId) {
        this.load(this.corpoCelesteId);
      }
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required]],
      tipo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      distanciaTerra: [null, [Validators.required, Validators.min(0)]],
    });
  }

  load(id: string): void {
    this.loading = true;
    this.errorMessage = '';
    this.astronomyService.getById(id).subscribe({
      next: (corpo) => {
        this.form.patchValue({
          nome: corpo.nome,
          tipo: corpo.tipo || '',
          descricao: corpo.descricao,
          distanciaTerra: corpo.distanciaTerra,
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Erro ao carregar dados do corpo celeste para edição.';
        this.loading = false;
      },
    });
  }

  submit(): void {
    this.onSubmit();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload: CelestialBody = {
      nome: this.form.value.nome,
      tipo: this.form.value.tipo,
      descricao: this.form.value.descricao,
      distanciaTerra: Number(this.form.value.distanciaTerra),
    };

    if (this.corpoCelesteId) {
      this.astronomyService.update(this.corpoCelesteId, payload).subscribe({
        next: () => {
          this.saving = false;
          this.successMessage = 'Corpo celeste atualizado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1500);
        },
        error: () => {
          this.saving = false;
          this.errorMessage = 'Erro ao atualizar o corpo celeste.';
        },
      });
    } else {
      this.astronomyService.create(payload).subscribe({
        next: () => {
          this.saving = false;
          this.successMessage = 'Corpo celeste cadastrado com sucesso!';
          setTimeout(() => {
            this.router.navigate(['/admin']);
          }, 1500);
        },
        error: () => {
          this.saving = false;
          this.errorMessage = 'Erro ao cadastrar o corpo celeste.';
        },
      });
    }
  }
}
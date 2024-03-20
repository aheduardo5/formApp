import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {
  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoritesGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Age of Empires', Validators.required],
    ]),
  });

  public newFavorite: FormControl = new FormControl('', [Validators.required]);
  constructor(private fb: FormBuilder) {}

  get favoriteGames() {
    return this.myForm.get('favoritesGames') as FormArray;
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  isValidFieldInArray(formArray: FormArray, index: number) {
    return (
      formArray.controls[index].errors && formArray.controls[index].touched
    );
  }

  getFieldError(field: string): string | null {
    console.log(field);
    if (!this.myForm.controls[field]) return null;

    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Requiere al menos ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  onAddToFavorites(): void {
    if (this.newFavorite.invalid) return;
    const newGame = this.newFavorite.value;

    // this.favoriteGames.push( new FormControl( newGame, Validators.required));
    this.favoriteGames.push(this.fb.control(newGame, Validators.required));
    this.newFavorite.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }
  onSubmit(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.favoriteGames.clear();
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}

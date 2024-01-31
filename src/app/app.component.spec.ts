import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing'; // Importa RouterTestingModule para manejar rutas
import { of } from 'rxjs'; // Importa 'of' para simular valores observables

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent, // Importar el componente si es standalone
        RouterTestingModule // Añade RouterTestingModule para pruebas de enrutamiento
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}) // Simula un Observable vacío para queryParams
          },
        },
      ],
    }).compileComponents();
  
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should invalidate the form when name is less than 3 characters', () => {
      component.customerName = 'Ju';
      component.validateName();
      expect(component.nameError).toBe('Solo letras y tres como mínimo');
    });

    it('should invalidate the form when phone number is not 9 digits', () => {
      component.customerPhone = '12345678';
      component.validatePhone();
      expect(component.phoneError).toBe('Solo números y deben de ser nueve');
    });

    it('should invalidate the form when email is not in correct format', () => {
      component.customerEmail = 'test@test';
      component.validateEmail();
      expect(component.emailError).toBe('Solo formato de email');
    });

    it('should validate the form with correct input values', () => {
      component.customerName = 'Juan Lop';
      component.customerPhone = '123456789';
      component.customerEmail = 'test@test.com';
      component.validateName();
      component.validatePhone();
      component.validateEmail();
      expect(component.nameError).toBe('');
      expect(component.phoneError).toBe('');
      expect(component.emailError).toBe('');
    });
  });
});

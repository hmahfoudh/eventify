import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProducteditComponent } from './product-edit.component';

describe('ProductEditComponent', () => {
  let component: ProducteditComponent;
  let fixture: ComponentFixture<ProducteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProducteditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

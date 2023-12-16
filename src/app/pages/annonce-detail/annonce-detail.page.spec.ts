import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnnonceDetailPage } from './annonce-detail.page';

describe('AnnonceDetailPage', () => {
  let component: AnnonceDetailPage;
  let fixture: ComponentFixture<AnnonceDetailPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnnonceDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

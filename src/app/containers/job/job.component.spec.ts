import { TestBed } from '@angular/core/testing';
import { JobComponent } from './job.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [JobComponent],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(JobComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Test'`, () => {
    const fixture = TestBed.createComponent(JobComponent);
    const app = fixture.componentInstance;
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(JobComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Test app is running!');
  });
});

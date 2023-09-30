import { TestBed } from '@angular/core/testing';
import { JobsListComponent } from './jobs-list.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [JobsListComponent],
    }),
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(JobsListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Test'`, () => {
    const fixture = TestBed.createComponent(JobsListComponent);
    const app = fixture.componentInstance;
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(JobsListComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Test app is running!');
  });
});

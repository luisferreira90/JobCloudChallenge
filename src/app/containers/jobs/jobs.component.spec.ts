import { TestBed } from '@angular/core/testing';
import { JobsComponent } from './jobs.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [JobsComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(JobsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Test'`, () => {
    const fixture = TestBed.createComponent(JobsComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Test');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(JobsComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Test app is running!');
  });
});

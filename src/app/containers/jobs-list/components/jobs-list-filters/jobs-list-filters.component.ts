import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { JobAdStatus, JobsListPageParams } from '../../../../models/models';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@UntilDestroy()
@Component({
  selector: 'app-jobs-list-filters',
  templateUrl: './jobs-list-filters.component.html',
  styleUrls: ['./jobs-list-filters.component.css'],
  standalone: true,
  imports: [CommonModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsListFiltersComponent implements OnInit {
  @Output()
  updateParams = new EventEmitter<Partial<JobsListPageParams>>();

  searchQuery = new FormControl('');
  statusFilter = new FormControl('');

  ngOnInit(): void {
    this._listenToSearchQuery();
    this._listenToStatusFilter();
  }

  private _listenToSearchQuery(): void {
    this.searchQuery.valueChanges
      .pipe(untilDestroyed(this), debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.updateParams.emit({ query: query, page: 0 });
      });
  }

  private _listenToStatusFilter(): void {
    this.statusFilter.valueChanges
      .pipe(untilDestroyed(this), distinctUntilChanged())
      .subscribe((status) => {
        this.updateParams.emit({ status: <JobAdStatus>status, page: 0 });
      });
  }
}

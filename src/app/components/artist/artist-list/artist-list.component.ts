import { Component, ViewChild, AfterViewInit, ViewEncapsulation } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { Router } from '@angular/router'
import { merge, of as observableOf } from 'rxjs'
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators'

import { Artist, ArtistPagination } from '../artist.model'
import { ArtistService } from '../artist.service'

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ArtistListComponent implements AfterViewInit {
  artists: ArtistPagination
  constructor (
    private artistService: ArtistService,
    private router: Router
  ) { }

  name = new FormControl('')
  query = 'direction=asc&columnName=name&page=0&perPage=5'

  displayedColumns: string[] = ['id', 'name', 'action']
  data: Artist[] = []

  resultsLength = 0
  isLoadingResults = true
  isRateLimitReached = false
  search = ''
  error = ''

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngAfterViewInit () {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => { this.paginator.pageIndex = 0 })

    merge(
      this.sort.sortChange,
      this.paginator.page,
      ArtistService.emitArtistCreated,
      this.name.valueChanges.pipe(debounceTime(1000))
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true
          const artist = this.name.value
          const direction = this.sort.direction
          const paginator = this.paginator.pageIndex
          const pageSize = this.paginator.pageSize

          return this.artistService!.list(direction, paginator, pageSize, artist)
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false
          this.isRateLimitReached = false
          this.resultsLength = Number(data.total)

          return data.data
        }),
        catchError((error) => {
          console.log(error)
          this.isLoadingResults = false
          this.isRateLimitReached = true
          return observableOf([])
        })
      ).subscribe(data => { this.data = data })
  }

  navigate (id: number) {
    this.router.navigate([`/artists/${id}`])
  }
}

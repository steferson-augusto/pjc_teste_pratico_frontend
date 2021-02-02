import { Component, ViewChild, AfterViewInit } from '@angular/core'
import { FormControl } from '@angular/forms'
import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { Router } from '@angular/router'
import { merge, of as observableOf } from 'rxjs'
import { catchError, debounceTime, map, startWith, switchMap } from 'rxjs/operators'

import { Album, AlbumPagination } from '../album.model'
import { AlbumService } from '../album.service'

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.scss']
})
export class AlbumListComponent implements AfterViewInit {
  albums: AlbumPagination

  constructor (
    private albumService: AlbumService,
    private router: Router
  ) { }

  name = new FormControl('')
  query = 'direction=asc&columnName=name&page=0&perPage=5'

  displayedColumns: string[] = ['id', 'artist', 'name', 'year', 'action']
  data: Album[] = []

  resultsLength = 0
  isLoadingResults = true
  isRateLimitReached = false
  search = ''
  error = ''

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  ngAfterViewInit () {
    this.sort.sortChange.subscribe(() => { this.paginator.pageIndex = 0 })

    merge(
      this.sort.sortChange,
      this.paginator.page,
      this.name.valueChanges.pipe(debounceTime(1000))
    )
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true
          const album = this.name.value
          const direction = this.sort.direction
          const orderBy = this.sort.active
          const paginator = this.paginator.pageIndex
          const pageSize = this.paginator.pageSize

          return this.albumService!.list(direction, orderBy, paginator, pageSize, album)
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
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true
          return observableOf([])
        })
      ).subscribe(data => { this.data = data })
  }

  navigate (id: number) {
    this.router.navigate([`/albums/${id}`])
  }
}

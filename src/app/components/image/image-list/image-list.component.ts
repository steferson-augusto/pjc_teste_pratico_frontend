import { Component, Input } from '@angular/core'
import { OwlOptions } from 'ngx-owl-carousel-o'
import { CustomSnackbarService } from '../../template/custom-snackbar/custom-snackbar.service'

import { ImageService } from '../image.service'
import { Image } from '../image.model'

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.scss']
})
export class ImageListComponent {
  constructor (private imageService: ImageService, private snack: CustomSnackbarService) { }
  @Input() data: Image[]
  @Input() editing: boolean
  @Input() id: number
  files: Set<File>
  deleting = { id: 0, loading: false }
  adding: boolean = false
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      }
    },
    nav: true
  }

  fileBrowseHandler (event) {
    const selectedFiles = <FileList>event.srcElement.files

    this.files = new Set()
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i])
    }

    this.onUpload()
  }

  onUpload () {
    if (this.files && this.files.size > 0) {
      this.adding = true
      this.imageService.upload(this.files, this.id).subscribe(
        ({ images }) => {
          this.adding = false
          this.data.push(...images)
          this.snack.open('Imagens adicionadas com sucesso', '', 'done', ['success'])
        },
        ({ error }) => {
          this.adding = false
          const message = error?.[0]?.message ?? 'Falha na requisição, tente novamente mais tarde'
          this.snack.open(message, '', 'error', ['warning'])
          console.error(error)
        }
      )
    }
  }

  deleteFile (file: File) {
    this.files.delete(file)
  }

  delete (id: number) {
    this.deleting = { id, loading: true }
    this.imageService.delete(id).subscribe(
      () => {
        this.deleting.loading = false
        this.data = this.data.filter(image => id !== image.id)
        this.snack.open('Imagem removida com sucesso', '', 'done', ['success'])
      },
      ({ error }) => {
        this.deleting.loading = false
        const message = error?.[0]?.message ?? 'Falha na requisição, tente novamente mais tarde'
        this.snack.open(message, '', 'error', ['warning'])
        console.error(error)
      }
    )
  }
}

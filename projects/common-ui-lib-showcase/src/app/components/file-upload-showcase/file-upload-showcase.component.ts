import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload-showcase',
  templateUrl: './file-upload-showcase.component.html',
})
export class FileUploadShowcaseComponent {
  filesUploaded: File[];

  setUploadedFiles(files: File[]): void {
    this.filesUploaded = files;
  }
}

import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'iras-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FileUploadComponent {
  @Input() supportedFileTypes: string[];
  @Input() maxFilesAllowed: number;
  @Input() uploadedFiles: File[] = [];
  @Output() upload: EventEmitter<File[]> = new EventEmitter<File[]>();
  @ViewChild('fileUpload') fileUpload: ElementRef<HTMLInputElement>;

  filesUploadedByUser: { file: File; error: string }[] = [];

  private fileNamePattern = new RegExp('^[\\w\\.\\-\\s_,()]{1,50}$');
  private fileErrors = [
    'Unsupported file type',
    'File size exceeded 10 MB',
    'File name exceeded 50 characters',
    'File name is invalid',
    'Number of files exceeded limit',
  ];

  openFileBrowser(): void {
    this.fileUpload.nativeElement.click();
  }

  fileHandler(files: FileList): void {
    Array.from(files).forEach((f) => {
      this.filesUploadedByUser = this.filesUploadedByUser.filter((upload) => upload.file?.name !== f.name);
      const fileExt = f.name.substr(f.name.lastIndexOf('.') + 1);
      const fileName = f.name.substr(0, f.name.lastIndexOf('.'));
      let fileError: string;
      if (this.supportedFileTypes.every((type) => type !== fileExt)) {
        fileError = this.fileErrors[0];
      } else if (f.size > 10000000) {
        fileError = this.fileErrors[1];
      } else if (fileName.length > 50) {
        fileError = this.fileErrors[2];
      } else if (!this.fileNamePattern.test(fileName)) {
        fileError = this.fileErrors[3];
      }
      this.filesUploadedByUser.push({ file: f, error: fileError });
      this.updateAllAttachedFiles();
    });
    this.fileUpload.nativeElement.value = '';
  }

  previewFile(file: File): void {
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    document.body.append(a);
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  removeFile(fileName: string): void {
    this.filesUploadedByUser = this.filesUploadedByUser.filter((upload) => upload.file.name !== fileName);
    this.updateAllAttachedFiles();
  }

  private updateAllAttachedFiles(): void {
    let allFiles = JSON.parse(JSON.stringify(this.uploadedFiles));
    for (const f of this.filesUploadedByUser) {
      if (!f.error || f.error === this.fileErrors[4]) {
        allFiles = allFiles.filter((a) => a.name !== f.file.name);
        if (allFiles.length < this.maxFilesAllowed) {
          f.error = undefined;
          allFiles.push(f.file);
        } else {
          f.error = this.fileErrors[4];
        }
      }
    }
    this.upload.emit(allFiles);
  }
}

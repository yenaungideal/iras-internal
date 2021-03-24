import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FileUploadComponent } from './file-upload.component';
import { IrasFileDropDirective } from './file-upload.directive';
import { IrasCardsModule } from '../card/cards.module';
import { IrasButtonsModule } from '../button/button.module';
import { IrasLinkModule } from '../link/link.module';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent, IrasFileDropDirective],
      imports: [IrasCardsModule, IrasButtonsModule, IrasLinkModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    component.supportedFileTypes = ['msg', 'pdf', 'tiff', 'tif', 'jpeg', 'jpg', 'png', 'doc', 'docx', 'xls', 'xlsx'];
    component.maxFilesAllowed = 5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open file browser on Select File button click.', () => {
    const nativeElementSpy = spyOn(component.fileUpload.nativeElement, 'click').and.stub();

    const selectFileButtonElement = fixture.debugElement.query(By.css('.iras-file-upload__file-upload-browse'));
    selectFileButtonElement.triggerEventHandler('buttonClicked', undefined);

    expect(nativeElementSpy).toHaveBeenCalled();
  });

  it('should add class drag-over to div on dragover.', () => {
    const fileDropElement = fixture.debugElement.query(By.css('.iras-file-upload__card-upload'));
    (fileDropElement.nativeElement as HTMLElement).dispatchEvent(new DragEvent('dragover'));
    fixture.detectChanges();

    expect(fileDropElement.classes['drag-over']).toBeTrue();
  });

  it('should remove class drag-over from div on dragleave.', () => {
    const fileDropElement = fixture.debugElement.query(By.css('.iras-file-upload__card-upload'));
    (fileDropElement.nativeElement as HTMLElement).dispatchEvent(new DragEvent('dragover'));
    fixture.detectChanges();

    expect(fileDropElement.classes['drag-over']).toBeTrue();

    (fileDropElement.nativeElement as HTMLElement).dispatchEvent(new DragEvent('dragleave'));
    fixture.detectChanges();

    expect(fileDropElement.classes['drag-over']).toBeFalsy();
  });

  it('should remove class drag-over from div on drop.', () => {
    const fileDropElement = fixture.debugElement.query(By.css('.iras-file-upload__card-upload'));
    (fileDropElement.nativeElement as HTMLElement).dispatchEvent(new DragEvent('dragover'));
    fixture.detectChanges();

    expect(fileDropElement.classes['drag-over']).toBeTrue();

    (fileDropElement.nativeElement as HTMLElement).dispatchEvent(new DragEvent('drop'));
    fixture.detectChanges();

    expect(fileDropElement.classes['drag-over']).toBeFalsy();
  });

  it('should upload one file on file dropped.', () => {
    const componentSpy = spyOn(component, 'fileHandler').and.callThrough();
    const outputSpy = spyOn(component.upload, 'emit').and.callThrough();
    const fileDropElement = fixture.debugElement.query(By.css('.iras-file-upload__card-upload'));
    const fileArray: File[] = [
      {
        name: 'file1.jpg',
        size: 123,
      } as File,
    ];
    const mockFileList: FileList = {
      0: fileArray[0],
      length: 1,
      item: (index: number) => fileArray[index],
    };
    fileDropElement.triggerEventHandler('fileDropped', mockFileList);

    expect(componentSpy).toHaveBeenCalled();
    expect(component.filesUploadedByUser[0].file).toBe(fileArray[0]);
    expect(component.filesUploadedByUser[0].error).toBeFalsy();
    expect(outputSpy).toHaveBeenCalledWith([fileArray[0]]);
  });

  it('should show file validation errors on file select upload.', () => {
    const componentSpy = spyOn(component, 'fileHandler').and.callThrough();
    const outputSpy = spyOn(component.upload, 'emit').and.callThrough();
    const fileInputElement = fixture.debugElement.query(By.css('.iras-file-upload__file-upload-input'));
    const fileArray: File[] = [
      {
        name: 'file1.txt',
        size: 123,
      } as File,
      {
        name: 'file2.jpg',
        size: 10000001,
      } as File,
      {
        name: 'file3file3file3file3file3file3file3file3file3file3file3.jpg',
        size: 123,
      } as File,
      {
        name: 'file*4.jpg',
        size: 123,
      } as File,
    ];
    const mockFileList: FileList = {
      0: fileArray[0],
      1: fileArray[1],
      2: fileArray[2],
      3: fileArray[3],
      length: 4,
      item: (index: number) => fileArray[index],
    };
    fileInputElement.triggerEventHandler('change', {
      target: {
        files: mockFileList,
      },
    });

    expect(componentSpy).toHaveBeenCalled();
    expect(component.filesUploadedByUser[0].file).toBe(fileArray[0]);
    expect(component.filesUploadedByUser[0].error).toBe('Unsupported file type');
    expect(component.filesUploadedByUser[1].file).toBe(fileArray[1]);
    expect(component.filesUploadedByUser[1].error).toBe('File size exceeded 10 MB');
    expect(component.filesUploadedByUser[2].file).toBe(fileArray[2]);
    expect(component.filesUploadedByUser[2].error).toBe('File name exceeded 50 characters');
    expect(component.filesUploadedByUser[3].file).toBe(fileArray[3]);
    expect(component.filesUploadedByUser[3].error).toBe('File name is invalid');
    expect(outputSpy).toHaveBeenCalledWith([]);
  });

  it('should show file exceeded limit on file upload.', () => {
    const outputSpy = spyOn(component.upload, 'emit').and.callThrough();
    const fileInputElement = fixture.debugElement.query(By.css('.iras-file-upload__file-upload-input'));
    const fileArray: File[] = [
      {
        name: 'file1.jpg',
        size: 123,
      } as File,
      {
        name: 'file2.jpg',
        size: 123,
      } as File,
      {
        name: 'file3.jpg',
        size: 123,
      } as File,
      {
        name: 'file4.jpg',
        size: 123,
      } as File,
      {
        name: 'file5.jpg',
        size: 123,
      } as File,
      {
        name: 'file6.jpg',
        size: 123,
      } as File,
    ];
    const mockFileList: FileList = {
      0: fileArray[0],
      1: fileArray[1],
      2: fileArray[2],
      3: fileArray[3],
      4: fileArray[4],
      5: fileArray[5],
      length: 6,
      item: (index: number) => fileArray[index],
    };
    fileInputElement.triggerEventHandler('change', {
      target: {
        files: mockFileList,
      },
    });

    expect(component.filesUploadedByUser[5].file).toBe(fileArray[5]);
    expect(component.filesUploadedByUser[5].error).toBe('Number of files exceeded limit');
    expect(outputSpy).toHaveBeenCalledWith([fileArray[0], fileArray[1], fileArray[2], fileArray[3], fileArray[4]]);
  });

  it('should download file on attachment click.', () => {
    const outputSpy = spyOn(component.upload, 'emit').and.callThrough();
    const componentSpy = spyOn(component, 'previewFile').and.callThrough();
    const fileInputElement = fixture.debugElement.query(By.css('.iras-file-upload__file-upload-input'));
    const fileArray: File[] = [new File([''], 'file1.jpg', { type: 'text/html' })];
    const mockFileList: FileList = {
      0: fileArray[0],
      length: 1,
      item: (index: number) => fileArray[index],
    };
    fileInputElement.triggerEventHandler('change', {
      target: {
        files: mockFileList,
      },
    });
    fixture.detectChanges();

    const attachmentLinkElement = fixture.debugElement.query(By.css('.iras-file-upload__attachment-link'));
    attachmentLinkElement.triggerEventHandler('click', undefined);

    expect(component.filesUploadedByUser.length).toBe(1);
    expect(outputSpy).toHaveBeenCalledWith([fileArray[0]]);
    expect(componentSpy).toHaveBeenCalledWith(fileArray[0]);
  });

  it('should remove file on remove icon click.', () => {
    const outputSpy = spyOn(component.upload, 'emit').and.callThrough();
    const fileInputElement = fixture.debugElement.query(By.css('.iras-file-upload__file-upload-input'));
    const fileArray: File[] = [
      {
        name: 'file1.jpg',
        size: 123,
      } as File,
    ];
    const mockFileList: FileList = {
      0: fileArray[0],
      length: 1,
      item: (index: number) => fileArray[index],
    };
    fileInputElement.triggerEventHandler('change', {
      target: {
        files: mockFileList,
      },
    });

    expect(component.filesUploadedByUser[0].file).toBe(fileArray[0]);
    expect(component.filesUploadedByUser[0].error).toBeFalsy();
    expect(outputSpy).toHaveBeenCalledWith([fileArray[0]]);

    fixture.detectChanges();

    const removeIconElement = fixture.debugElement.query(By.css('.iras-file-upload__remove-file'));
    removeIconElement.triggerEventHandler('click', undefined);

    expect(component.filesUploadedByUser.length).toBe(0);
    expect(outputSpy).toHaveBeenCalledWith([]);
  });
});

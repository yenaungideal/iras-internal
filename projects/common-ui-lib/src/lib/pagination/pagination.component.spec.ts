import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PaginationComponent],
        imports: [HttpClientTestingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.paginationNumMaxDisplay = 5;
    component.activePageIndex = 2;
  });

  it('should create', () => {
    component.activePageIndex = 2;
    expect(component).toBeTruthy();
  });

  it('getScreenSize innerwidth 500', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(500);
    component.getScreenSize();
    expect(component.paginationNumMaxDisplay).toEqual(1);
  });

  it('getScreenSize innerwidth 900', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(900);
    component.getScreenSize();
    expect(component.paginationNumMaxDisplay).toEqual(5);
  });

  it('jumpToLastPage', () => {
    spyOn(component.stateChanged, 'emit');
    component.activePage = 1;
    component.jumpToLastPage();
    expect(component.stateChanged.emit).toHaveBeenCalledWith(component.activePage);
  });

  it('jumpToFirstPage', () => {
    spyOn(component.stateChanged, 'emit');
    component.activePage = 1;
    component.jumpToFirstPage();
    expect(component.stateChanged.emit).toHaveBeenCalledWith(component.activePage);
  });

  it('changePage', () => {
    spyOn(component.stateChanged, 'emit');
    component.changePage(1);
    expect(component.stateChanged.emit).toHaveBeenCalledWith(component.activePage);
  });

  it('changePageByAddOne', () => {
    spyOn(component.stateChanged, 'emit');
    component.changePageByAddOne(1);
    expect(component.stateChanged.emit).toHaveBeenCalledWith(component.activePage);
    //expect(component.pageLengthAddOne).toHaveBeenCalled();
  });

  it('changePageByMinusOne', () => {
    spyOn(component.stateChanged, 'emit');
    component.activePage = 2;
    component.changePageByMinusOne(3);
    //component.pageLengthMinusOne();
    expect(component.stateChanged.emit).toHaveBeenCalledWith(component.activePage);
  });

  it('createArray', () => {
    component.numPages = 3;
    component.createArray();
    expect(component.paginationList.length).toEqual(3);
  });

  it('pageLengthMinusOne', () => {
    component.numPages = 3;
    component.paginationMinDisplay = 2;
    component.paginationSizeMax = 2;
    component.pageLengthMinusOne();
    expect(component.paginationMinDisplay).toEqual(1);
  });
});

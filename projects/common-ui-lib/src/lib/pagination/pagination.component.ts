import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'iras-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() totalPages: number;

  @Input() visiblePages: number;

  @Input() activePageIndex: number;

  @Output() stateChanged = new EventEmitter<number>();

  /* Pagination bar numbers array*/
  paginationList: Array<number> = [];

  /*number of pages based on array data */
  numPages = 1;
  /*current active page Default:1*/
  activePage = 1;

  /* Pagination Bar Limits */
  paginationMinDisplay = 0;

  /* Get input from --- */
  paginationSizeMax = 5;

  paginationNumMaxDisplay: number = this.paginationSizeMax;

  ngOnInit() {
    if (this.activePageIndex > 1) {
      this.activePage = this.activePageIndex;
    }
    this.getScreenSize();
    this.getDataArrayInput();
  }

  getDataArrayInput() {
    this.numPages = this.totalPages / this.visiblePages;
    this.checkPagesIsValid();
    this.createArray();
  }

  /* Create the pages array (page bar) based on the number of pages */
  createArray() {
    if (!isNaN(this.numPages)) {
      this.paginationList = Array.from(Array(this.numPages), (e, i) => i + 1);
    }
  }

  /*if number of pages is a decimal, round up to the nearest whole number */
  checkPagesIsValid() {
    if (this.numPages % 1 !== 0) {
      this.numPages = Math.ceil(this.numPages);
    }
  }

  /*change page based on page number */
  changePage(pageNum: number) {
    this.activePage = pageNum;
    this.stateChanged.emit(this.activePage);
  }

  /*change page by +1*/
  changePageByAddOne(currentPage: number) {
    if (this.activePage === this.numPages || this.activePage > this.numPages) {
      return;
    }
    this.activePage = currentPage + 1;
    this.stateChanged.emit(this.activePage);
    this.pageLengthAddOne();
  }

  /*change page by -1*/
  changePageByMinusOne(currentPage: number) {
    if (this.activePage === 1) {
      return;
    }
    this.activePage = currentPage - 1;
    this.stateChanged.emit(this.activePage);
    this.pageLengthMinusOne();
  }

  /* if pages exceed >10, numbers will shift by changing array of page numbers */
  pageLengthAddOne() {
    if (
      this.paginationMinDisplay === this.numPages - this.paginationSizeMax ||
      this.numPages < this.paginationSizeMax
    ) {
      return;
    }
    this.paginationMinDisplay = this.paginationMinDisplay + 1;
    this.paginationNumMaxDisplay = this.paginationNumMaxDisplay + 1;
  }

  pageLengthMinusOne() {
    if (this.paginationMinDisplay === 0 || this.numPages < this.paginationSizeMax) {
      return;
    }
    this.paginationMinDisplay = this.paginationMinDisplay - 1;
    this.paginationNumMaxDisplay = this.paginationNumMaxDisplay - 1;
  }

  /* Reset the pages array slice */
  jumpToFirstPage() {
    this.activePage = 1;
    this.paginationMinDisplay = 0;
    this.paginationNumMaxDisplay = this.paginationSizeMax;
    this.stateChanged.emit(this.activePage);
  }

  /* Set the pages array slice to Max*/
  jumpToLastPage() {
    this.activePage = this.numPages;
    this.paginationMinDisplay = this.numPages - this.paginationSizeMax;
    this.paginationNumMaxDisplay = this.numPages;
    this.stateChanged.emit(this.activePage);
  }

  @HostListener('window:resize')
  getScreenSize() {
    const scrWidth = window.innerWidth;
    if (scrWidth <= 768) {
      this.paginationSizeMax = 1;
      this.paginationNumMaxDisplay = this.paginationSizeMax;
    } else if (scrWidth > 769) {
      this.paginationSizeMax = 5;
      this.paginationNumMaxDisplay = this.paginationSizeMax;
    }
  }
}

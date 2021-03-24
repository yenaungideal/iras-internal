/**
 * Configuration for opening a popover with the Popover service.
 */
export interface PopoverConfig<T = any> {
  backdropClass: string;
  data?: T;
  disableClose: boolean;
  panelClass: string | string[];
  position: 'after' | 'before' | 'above' | 'below';
  arrowOffset?: number;
}

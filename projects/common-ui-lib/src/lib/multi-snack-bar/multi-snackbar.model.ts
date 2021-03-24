import { SafeHtml } from '@angular/platform-browser';

export interface IMultiSnackbarOptions {
  title?: string;
  description: string;
  descriptionSanitizedHTML?: SafeHtml;
  actionText?: string;
  type: 'snack-bar-default';
  uniqueId?: string;
}

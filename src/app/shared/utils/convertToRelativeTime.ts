import { Timestamp, FieldValue } from '@angular/fire/firestore';


export function convertToRelativeTime(date: Timestamp | FieldValue): string {
  if (!(date instanceof Timestamp)) return 'N/A';
  const now = new Date();
  const diffInMilliseconds = now.getTime() - date.toDate().getTime();

  const diffInSeconds = diffInMilliseconds / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;
  const diffInMonths = diffInDays / 30; // Approximation: 30 days per month
  const diffInYears = diffInDays / 365;

  if (diffInSeconds < 60) {
    return `${Math.floor(diffInSeconds)} seconds ago`;
  } else if (diffInMinutes < 60) {
    return `${Math.floor(diffInMinutes)} minutes ago`;
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays)} days ago`;
  } else if (diffInMonths < 12) {
    return `${Math.floor(diffInMonths)} months ago`;
  } else {
    return `${Math.floor(diffInYears)} years ago`;
  }
}

import { Injectable } from '@angular/core';

@Injectable()
export class FormatterService {

   constructor() {
   }

   formatChatDate(date: Date) {
      //Changes date object into user readable string for chat bubbles
      let displayDate: string = "";

      let month = this.formatDisplayMonth(date.getMonth());
      let day = date.getDate();

      displayDate = month + " " + day + " " + this.formatTime(date);

      return displayDate;
   }

   formatDisplayMonth(month) {
      //Returns short string for month number
      let displayMonth: string;

      switch (month) {
         case 0:
            displayMonth = "Jan";
            break;
         case 1:
            displayMonth = "Feb";
            break;
         case 2:
            displayMonth = "Mar";
            break;
         case 3:
            displayMonth = "Apr";
            break;
         case 4:
            displayMonth = "May";
            break;
         case 5:
            displayMonth = "Jun";
            break;
         case 6:
            displayMonth = "Jul";
            break;
         case 7:
            displayMonth = "Aug";
            break;
         case 8:
            displayMonth = "Sep";
            break;
         case 9:
            displayMonth = "Oct";
            break;
         case 10:
            displayMonth = "Nov";
            break;
         case 11:
            displayMonth = "Dec";
            break;
      }

      return displayMonth;
   }

   formatTime(date: Date) {
      //Formats the time into 12 hour Am Pm times
      let hour = date.getHours();
      let minutes = date.getMinutes();

      let hourMark = "AM";

      if(hour === 12)
         hourMark = "PM";

      if (hour > 12) {
         hour = hour - 12;
         hourMark = "PM";
      }

      if (hour === 0)
         hour = 12;

      let displayTime = hour + ":" + minutes + " " + hourMark;

      return displayTime;
   }
}
import { Component } from '@angular/core';
import { ReportService } from '../report.service';


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
})
export class ReportComponent {

  constructor(private reportService: ReportService) { }

  download(type: string) {
    this.reportService.downloadReport(type).subscribe((res) => {
      const file = new Blob([res], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}

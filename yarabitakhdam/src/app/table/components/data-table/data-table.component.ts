import { Component, OnInit } from '@angular/core';
import { TablesDataService } from './tablesData.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [TablesDataService]
})
export class DataTableComponent implements OnInit {
  tableData: Array<any>;

  /* pagination Info */
  pageSize = 10;
  pageNumber = 1;

  constructor(private _tablesDataService: TablesDataService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
      console.log('test');

      this.tableData = this._tablesDataService.DATA;
      console.log(this.tableData);
  }

  pageChanged(pN: number): void {
    console.log(pN);
    this.pageNumber = pN;
  }

}

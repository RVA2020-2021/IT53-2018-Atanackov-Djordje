import { createViewChild } from '@angular/compiler/src/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Kredit } from 'src/app/models/kredit';
import { KlijentService } from 'src/app/services/klijent.service';
import { KlijentDialogComponent } from '../dialogs/klijent-dialog/klijent-dialog.component';

@Component({
  selector: 'app-klijent',
  templateUrl: './klijent.component.html',
  styleUrls: ['./klijent.component.css']
})
export class KlijentComponent implements OnInit {

  displayedColumns = ['id', 'borjLk', 'ime', 'prezime','kredit', 'actions'];
  dataSource: MatTableDataSource<Klijent>;
  subscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;



  constructor(private klijentService: KlijentService, 
                private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.klijentService.getAllKlijents().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }

  }

  public openDialog(flag: number, id?: number, borjLk?: number, ime?: string, prezime?: string, kredit?: number) : void{
    const dialogRef = this.dialog.open(KlijentDialogComponent, {data: {id,borjLk,ime,prezime, kredit}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res == 1){
        this.loadData();
      }
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}

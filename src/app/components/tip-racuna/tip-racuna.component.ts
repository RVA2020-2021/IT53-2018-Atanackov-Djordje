import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';
import { TipRacunaDialogComponent } from '../dialogs/tip-racuna-dialog/tip-racuna-dialog.component';

@Component({
  selector: 'app-tip-racuna',
  templateUrl: './tip-racuna.component.html',
  styleUrls: ['./tip-racuna.component.css']
})
export class TipRacunaComponent implements OnInit {


  displayedColumns = ['id', 'naziv', 'opis', 'oznaka', 'actions'];
  dataSource: MatTableDataSource<TipRacuna>;
  subscription: Subscription;


  constructor(private tipRacunaServices: TipRacunaService, 
                private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.tipRacunaServices.getAllTipRacunas().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }

  }

  public openDialog(flag: number, id?: number, naziv?: string, opis?: string, oznaka?: string) : void{
    const dialogRef = this.dialog.open(TipRacunaDialogComponent, {data: {id,naziv,opis,oznaka}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res == 1){
        this.loadData();
      }
    })
  }

}

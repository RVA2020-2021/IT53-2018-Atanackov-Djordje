import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { RacunService } from 'src/app/services/racun.service';
import { RacunDialogComponent } from '../dialogs/racun-dialog/racun-dialog.component';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'naziv', 'opis', 'oznaka','tipRacuna', 'klijent', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  subscription: Subscription;


  constructor(private racunServices: RacunService, 
                private dialog: MatDialog) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.subscription = this.racunServices.getAllRacuns().subscribe(
      data => {
        this.dataSource = new MatTableDataSource(data);
      }
    ),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }

  }

  public openDialog(flag: number, id?: number, naziv?: string, opis?: string, oznaka?: string, tipRacuna?: TipRacuna, klijent?:Klijent) : void{
    const dialogRef = this.dialog.open(RacunDialogComponent, {data: {id,naziv,opis,oznaka, tipRacuna, klijent}});

    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe(res => {
      if(res == 1){
        this.loadData();
      }
    })
  }


}

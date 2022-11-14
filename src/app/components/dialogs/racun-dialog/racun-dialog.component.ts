import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Klijent } from 'src/app/models/klijent';
import { Racun } from 'src/app/models/racun';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { KlijentService } from 'src/app/services/klijent.service';
import { RacunService } from 'src/app/services/racun.service';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

 
  public flag:number;
  tipoviRacuna: TipRacuna[];
  klijenti: Klijent[];


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService,
              public tipRacunaService: TipRacunaService,
              public klijentService: KlijentService) { }

  ngOnInit(): void {
    this.tipRacunaService.getAllTipRacunas().subscribe(
      data => {
        this.tipoviRacuna = data;
      }
    );
    this.klijentService.getAllKlijents().subscribe(
      data => {
        this.klijenti = data;
      }
    )
  }

  compareTo(a,b) {
    return a.id == b.id;
  }

  public addRacun(): void {
    this.racunService.addRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat racun: ' + this.data.id, 'OK', {duration:2500})
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog racuna ', 'Zatvori', {duration: 2500})
    }
  }

  public updateRacun(): void {
    this.racunService.updateRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspesno modifikovan racun: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postojeceg racuna ', 'Zatvori', {duration: 2500})
    }
  }

  public deleteRacun(): void {
    this.racunService.deleteRacun(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan racun: ' + this.data.id, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postojeceg racuna ', 'Zatvori', {duration: 2500})
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration: 1000})

}}

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TipRacuna } from 'src/app/models/tipRacuna';
import { TipRacunaService } from 'src/app/services/tip-racuna.service';

@Component({
  selector: 'app-tip-racuna-dialog',
  templateUrl: './tip-racuna-dialog.component.html',
  styleUrls: ['./tip-racuna-dialog.component.css']
})
export class TipRacunaDialogComponent implements OnInit {


  public flag:number;


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<TipRacunaDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: TipRacuna,
              public tipRacunaServices: TipRacunaService) { }

  ngOnInit(): void {
  }

  public addTipRacuna(): void {
    this.tipRacunaServices.addTipRacuna(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat tip racuna: ' + this.data.naziv, 'OK', {duration:2500})
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog kredita ', 'Zatvori', {duration: 2500})
    }
  }

  public updateTipRacuna(): void {
    this.tipRacunaServices.updateTipRacuna(this.data).subscribe(() => {
      this.snackBar.open('Uspesno modifikovan tip racuna: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postojeceg tipa racuna ', 'Zatvori', {duration: 2500})
    }
  }

  public deleteTipRacuna(): void {
    this.tipRacunaServices.deleteTipRacuna(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan tip racuna: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postojeceg tipa racuna ', 'Zatvori', {duration: 2500})
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration: 1000})
  }

}

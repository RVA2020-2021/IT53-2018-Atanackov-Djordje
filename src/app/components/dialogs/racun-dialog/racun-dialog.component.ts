import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Racun } from 'src/app/models/racun';
import { RacunService } from 'src/app/services/racun.service';

@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

 
  public flag:number;


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Racun,
              public racunService: RacunService) { }

  ngOnInit(): void {
  }

  public addRacun(): void {
    this.racunService.addRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat racun: ' + this.data.naziv, 'OK', {duration:2500})
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog racuna ', 'Zatvori', {duration: 2500})
    }
  }

  public updateRacun(): void {
    this.racunService.updateRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspesno modifikovan racun: ' + this.data.naziv, 'OK', {
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
      this.snackBar.open('Uspesno obrisan racun: ' + this.data.naziv, 'OK', {
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

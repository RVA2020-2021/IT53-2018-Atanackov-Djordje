import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Kredit } from 'src/app/models/kredit';
import { KreditService } from 'src/app/services/kredit.service';

@Component({
  selector: 'app-kredit-dialog',
  templateUrl: './kredit-dialog.component.html',
  styleUrls: ['./kredit-dialog.component.css']
})
export class KreditDialogComponent implements OnInit {

  public flag:number;


  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<KreditDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Kredit,
              public kreditService: KreditService) { }

  ngOnInit(): void {
  }

  public addKredit(): void {
    this.kreditService.addKredit(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat kredit: ' + this.data.naziv, 'OK', {duration:2500})
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja novog kredita ', 'Zatvori', {duration: 2500})
    }
  }

  public updateKredit(): void {
    this.kreditService.updateKredit(this.data).subscribe(() => {
      this.snackBar.open('Uspesno modifikovan kredit: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postojeceg kredita ', 'Zatvori', {duration: 2500})
    }
  }

  public deleteKredit(): void {
    this.kreditService.deleteKredit(this.data.id).subscribe(() => {
      this.snackBar.open('Uspesno obrisan kredit: ' + this.data.naziv, 'OK', {
        duration: 2500
      })
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
      this.snackBar.open('Doslo je do greske prilikom modifikacije postojeceg kredita ', 'Zatvori', {duration: 2500})
    }
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste.', 'Zatvori', {duration: 1000})
  }
  

}

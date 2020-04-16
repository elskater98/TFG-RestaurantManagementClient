import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-reserva-create',
  templateUrl: './reserva-create.component.html',
  styleUrls: ['./reserva-create.component.css']
})
export class ReservaCreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              private dialogRef: MatDialogRef<ReservaCreateComponent>,
              @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {

  }

}

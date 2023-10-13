import { Component, OnDestroy, OnInit } from '@angular/core';
import { ContactCardDialogService } from '@app/contact-card/services/contact-card-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private contactCardDialog: ContactCardDialogService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.contactCardDialog.openDialog();
  }
}

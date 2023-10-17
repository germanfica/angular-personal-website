import { Component, OnInit } from '@angular/core';
import { ContactCardDialogManagerService } from '@app/contact-card/services/contact-card-dialog-manager.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private contactCardDialog: ContactCardDialogManagerService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.contactCardDialog.open();
  }
}

import { Component, OnInit } from '@angular/core';
import { ContactCardDialogService } from '@app/contact-card/services/contact-card-dialog.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private contactCardDialog: ContactCardDialogService) { }

  ngOnInit(): void {
  }

  openDialog() {
    this.contactCardDialog.open();
  }
}

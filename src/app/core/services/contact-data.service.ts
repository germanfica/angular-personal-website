import { Injectable } from '@angular/core';
import { Contact } from '@core/models/contact';

/**
 * @deprecated
 * Este servicio se encarga de mantener en memoria los datos del formulario de contacto.
 * Fue creado con la intención de almacenar temporalmente los datos de contacto
 * ingresados en el componente `ContactCardComponent`. Si en un futuro se desea expandir
 * o modificar la forma en que se manejan estos datos, este es el servicio al cual
 * acudir.
 *
 * @example
 * ```typescript
 * contactService.setContactData({ name: 'Juan', email: 'juan@example.com' });
 * const data = contactService.getContactData();  // { name: 'Juan', email: 'juan@example.com' }
 * ```
 *
 * @author German Fica
 * @date 2023-10-13 (YYYY-MM-DD)
 */
@Injectable({
  providedIn: 'root'
})
export class ContactDataService {
  // Almacena los datos del contacto en memoria
  private contactData: Contact = {} as Contact;

  constructor() { }

  /**
   * @deprecated
   * Setea los datos del contacto.
   *
   * @param data - Los datos del contacto a almacenar.
   */
  setContactData(data: Contact) {
    this.contactData = data;
  }

  /**
   * @deprecated
   * Obtiene los datos del contacto almacenados en memoria.
   *
   * @returns Los datos del contacto.
   */
  getContactData(): Contact {
    return this.contactData;
  }
}

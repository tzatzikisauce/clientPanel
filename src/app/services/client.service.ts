import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../models/Client';
import { ChangeDetectorStatus } from '@angular/core/src/change_detection/constants';
import { database } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection('clients');
   }

   getClients(): Observable<Client[]> {
     // Get clients with the id
     this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
 
        return data;
      });
    }));
 
    return this.clients;
  }
}

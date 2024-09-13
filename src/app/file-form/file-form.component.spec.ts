import { Component, EventEmitter, Output } from '@angular/core';
import { FileItem, FileType } from '../models/file.item.model';
import { OWNERS } from '../data/file.storage';

@Component({
  selector: 'app-file-form',
  standalone: true,
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent {
  newFile: FileItem = {
    id: '',
    name: '',
    creation: new Date(),
    type: FileType.FILE,
    owners: []
  };

  @Output() fileCreated = new EventEmitter<FileItem>();

  get owners() {
    return OWNERS;
  }

  onSubmit() {
    if (!this.newFile.name || this.newFile.type === undefined) {
      alert('Nombre y tipo de archivo son obligatorios.');
      return;
    }
    this.newFile.id = (Math.random() * 100).toString(); // ID temporal
    this.fileCreated.emit(this.newFile);
    this.newFile = { id: '', name: '', creation: new Date(), type: FileType.FILE, owners: [] };
  }
}

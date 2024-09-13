import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FileItem, FileOwner, FileType } from '../models/file.item.model';
import { OWNERS } from '../data/file.storage';

@Component({
  selector: 'app-file-list',
  standalone: true,
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent {
  @Input() files: FileItem[] = [];
  @Output() deleteFiles = new EventEmitter<FileItem[]>();
  @Output() editFile = new EventEmitter<FileItem>();

  selectedFiles: Set<FileItem> = new Set<FileItem>();

  get sortedFiles() {
    const folders = this.files.filter(file => file.type === FileType.FOLDER).sort((a, b) => a.name.localeCompare(b.name));
    const files = this.files.filter(file => file.type === FileType.FILE).sort((a, b) => a.name.localeCompare(b.name));
    return [...folders, ...files];
  }

  toggleSelection(file: FileItem) {
    if (this.selectedFiles.has(file)) {
      this.selectedFiles.delete(file);
    } else {
      this.selectedFiles.add(file);
    }
  }

  handleDelete() {
    if (this.selectedFiles.size === 0) return;

    if (this.selectedFiles.size === 1) {
      this.deleteFiles.emit([...this.selectedFiles]);
    } else if (this.selectedFiles.size > 1) {
      if (confirm(`¿Estás seguro de borrar ${this.selectedFiles.size} archivos?`)) {
        this.deleteFiles.emit([...this.selectedFiles]);
      }
    }
  }

  getFileOwnerDisplay(owners: FileOwner[]): string {
    if (owners.length > 3) {
      return `${owners.slice(0, 3).map(owner => owner.name).join(', ')} (+${owners.length - 3})`;
    }
    return owners.map(owner => owner.name).join(', ');
  }
}

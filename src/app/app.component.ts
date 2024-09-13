import { Component } from '@angular/core';
import { FileListComponent } from './file-list/file-list.component';
import { FileFormComponent } from './file-form/file-form.component';
import { FileItem } from './models/file.item.model';
import { FILE_LIST } from './data/file.storage';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FileListComponent, FileFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  files: FileItem[] = FILE_LIST;
  showForm: boolean = false;

  handleFileCreated(newFile: FileItem) {
    this.files.push(newFile);
  }

  handleFileDeletion(filesToDelete: FileItem[]) {
    this.files = this.files.filter(file => !filesToDelete.includes(file));
  }
}

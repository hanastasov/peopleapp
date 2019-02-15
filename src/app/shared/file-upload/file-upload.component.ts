import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

    @Input()
    filePrompt: string = 'Choose a file...';

    @Output()
    fileSelected: EventEmitter<HTMLInputElement> = new EventEmitter<HTMLInputElement>();

    constructor() { }

    ngOnInit() {
    }

    onFileSelected(input: HTMLInputElement) {
        this.fileSelected.emit(input);
    }

}

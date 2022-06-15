import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';
import { saveAs } from 'file-saver';
import { Message } from 'src/models/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  employe?: Employe;
  myForm: FormGroup = new FormGroup({});
  formdata = new FormData();
  contenu: FormControl = new FormControl('', [Validators.required]);
  envoyeur: FormControl = new FormControl();
  recepteur: FormControl = new FormControl();
  files: FormControl = new FormControl();
  messages: Message [] = [];
  @Input() employeSelected: any;
  enLigne: any = [];
  previews: any = [];
  @ViewChild('scrollable') scrollable?: ElementRef;
  @Output() deselectEmployeEvent  = new EventEmitter<any>();

  shouldScrollDown?: boolean;
  iterableDiffer?: any;
  numberOfMessagesChanged: boolean = true;
  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngAfterViewChecked(): void {
    const isScrolledDown =
      Math.abs(
        this.scrollable?.nativeElement.scrollHeight -
          this.scrollable?.nativeElement.scrollTop -
          this.scrollable?.nativeElement.clientHeight
      ) <= 3.0;

    if (this.numberOfMessagesChanged || !isScrolledDown) {
      this.scrollToBottom();
      this.numberOfMessagesChanged = false;
    }


  }

  scrollToBottom() {
    if (this.scrollable) {
      this.scrollable.nativeElement.scrollTop =
        this.scrollable?.nativeElement.scrollHeight;
    }
  }

  ngOnChanges() {
    if (this.employeSelected) {
      this.authService.getAuth().subscribe((employe) => {
        this.employe = employe;
        this.chatService
        .afficherConversation(this.employe?._id, this.employeSelected._id)
        .subscribe((res) => {
          if (res) this.messages = res.messages;
          else this.messages = [];
        });
      });

    }

    this.socketService.listen('updateMsg').subscribe((res) => {
      this.chatService
        .afficherConversation(this.employe?._id, this.employeSelected._id)
        .subscribe((res) => {
          if (res) this.messages = res.messages;
          else this.messages = [];
        });
    });
  }

  ngOnInit(): void {
    this.scrollToBottom();
    this.afficherEmploye()
    this.socketService.listen('newMsg').subscribe((msg) => {
      if (msg) {
        this.numberOfMessagesChanged = true;
        this.messages?.push(msg);
      }
    });

    this.socketService.listen('enLigne').subscribe((res) => {
      this.enLigne = []
      for (const user of res) {
        this.enLigne.push(user.id);
      }
    });

    this.createForm();
  }

  createForm() {
    this.myForm = new FormGroup({
      contenu: this.contenu,
      envoyeur: this.envoyeur,
      recepteur: this.recepteur,
      files: this.files,
    });
  }

  afficherEmploye(){
    
    this.authService.getAuth().subscribe((employe) => {
      this.employe = employe;
    });

  }

  download(fileName: string) {
    this.chatService.downloadFile(fileName).subscribe((res) => {
      saveAs(res, fileName);
    });
  }

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      const reader = new FileReader();
      if (element.type.includes('image')) {
        reader.onload = () => {
          this.previews.push({ type: 'image', data: reader.result as string , file : element});
        };
      } else {
        this.previews.push({ type: 'file', data: element.name , file : element });
      }

      reader.readAsDataURL(element);
    }
  }

  envoyer() {
    this.envoyeur.setValue(this.employe?._id);
    this.recepteur.setValue(this.employeSelected._id);
    this.formdata.append('envoyeur', this.envoyeur.value);
    this.formdata.append('recepteur', this.recepteur.value);
    this.formdata.append('contenu', this.contenu.value);

    for (const prev of this.previews) {
       this.formdata.append('files', prev.file);
    }

    this.chatService.ajouterMessage(this.formdata).subscribe((res) => {
      this.messages.push(res);
      this.contenu.setValue('');
      this.numberOfMessagesChanged = true;
      this.formdata = new FormData();
      this.previews = [];
    });
  }

  messageNonLue() {
    let nonLue = [];
    for (var i = this.messages.length - 1; i >= 0; i--) {
      const msg = this.messages[i];
      if (msg.lue == true && msg.envoyeur != this.employe?._id) break;
      if (msg.envoyeur != this.employe?._id) nonLue.push(msg._id);
    }

    if (nonLue.length > 0)
      this.chatService
        .modifierMessages(this.employe?._id, this.employeSelected?._id, nonLue)
        .subscribe((res) => {
        });
  }

  close() {
    this.deselectEmployeEvent.emit(true);
  }
  

  deleteFile(i: number) {
    this.previews.splice(i, 1);

  }
}

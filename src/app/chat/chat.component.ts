import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';
import { saveAs } from 'file-saver';

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
  messages: any;
  @Input() employeSelected: any;
  user: any;
  enLigne: any = [];
  attachements : any = []
  previews : any = []
  @ViewChild('scrollable') scrollable?: ElementRef;
  @Input() show : any
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
      this.user = this.employeSelected;
      this.chatService
        .afficherConversation(this.employe?._id, this.employeSelected._id)
        .subscribe((res) => {
          console.log(res)
          if (res) this.messages = res.messages;
          else this.messages = [];
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


    if(this.employeSelected)
    this.user = this.employeSelected

    this.authService.getAuth().subscribe((employe) => {
      this.employe = employe;
    });

    this.socketService.listen('newMsg').subscribe((msg) => {
      if (msg) {
        this.numberOfMessagesChanged = true;
        this.messages?.push(msg);
      }
    });

    this.socketService.listen('enLigne').subscribe((res) => {
      for (const user of res) {
        this.enLigne.push(user.id);
      }
      console.log(res);
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

  download(fileName: string) {
    this.chatService.downloadFile(fileName).subscribe((res) => {
      console.log(res)
      saveAs(res, fileName);
    });
  }


  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      const reader = new FileReader();
      console.log(element)
      if(element.type.includes('image')){
        reader.onload = () => {
          this.previews.push({type : 'image' , data :  reader.result as string })
        }
      }
      else{
        this.previews.push({type : 'file' , data : element.name })

      }
       
        reader.readAsDataURL(element)
        this.formdata.append('files', element);
    }
  }


  preview (file : any){
    let filePreview : any
    const reader = new FileReader();
    reader.onload = () => {
      filePreview =  reader.result as string 
    }
    return reader.readAsDataURL(file)
  }

  envoyer() {
    this.envoyeur.setValue(this.employe?._id);
    this.recepteur.setValue(this.employeSelected._id);
    this.formdata.append('envoyeur',this.envoyeur.value)
    this.formdata.append('recepteur',this.recepteur.value)
    this.formdata.append('contenu',this.contenu.value)
    // this.myForm.patchValue({
    //   files: this.attachements
    // });
    // this.myForm.get('files')?.updateValueAndValidity()
    this.chatService.ajouterMessage(this.formdata).subscribe((res) => {
      this.messages.push(res);
      this.contenu.setValue('');
      this.numberOfMessagesChanged = true;
      this.formdata = new FormData()
      this.previews = []
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
          if (res) console.log(res);
        });
  }

  close() {
    this.user = null
  }
}

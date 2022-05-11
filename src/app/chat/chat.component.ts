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
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employe } from 'src/models/employe';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { SocketService } from '../services/socket.service';

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
  @Input() messages: any;
  @Input() employeSelected: any;

  @ViewChild('scrollable') scrollable?: ElementRef;

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
    if (this.scrollable){
      this.scrollable.nativeElement.scrollTop =
      this.scrollable?.nativeElement.scrollHeight;
      console.log(this.scrollable)
    }
    
  }


  ngOnInit(): void {
    // if(this.employeSelected){
    //   console.log(this.employeSelected)

    // }
    this.scrollToBottom();


    this.authService.getAuth().subscribe((employe) => {
      this.employe = employe;
    });

    this.socketService.listen('newMsg').subscribe((msg) => {
      if (msg)
      {
        this.numberOfMessagesChanged = true;
        this.messages.push(msg)
      } 
      console.log(this.messages);
    });

    this.createForm();
  }

  updateScroll() {
    var element = document.getElementById('yourDivID');
    if (element) element.scrollTop = element.scrollHeight;
  }
  createForm() {
    this.myForm = new FormGroup({
      contenu: this.contenu,
      envoyeur: this.envoyeur,
      recepteur: this.recepteur,
    });
  }

  envoyer() {
    this.envoyeur.setValue(this.employe?._id);
    this.recepteur.setValue(this.employeSelected._id);
    this.chatService.ajouterMessage(this.myForm.value).subscribe((res) => {
      this.messages.push(res);
      this.myForm.reset();
      this.numberOfMessagesChanged = true;
    });
  }

  close() {
    this.employeSelected = null;
  }
}

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
  messages: any;
  @Input() employeSelected: any;
  user : any
  enLigne : any = []

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
    }
    
  }

  ngOnChanges() {
    if(this.employeSelected) {
      this.user  = this.employeSelected
      this.chatService.afficherConversation(this.employe?._id,this.employeSelected._id).subscribe(res=>{
        if(res)
          this.messages = res.messages 
        else this.messages= []
      })
    }

    this.socketService.listen('updateMsg').subscribe(res=>{
      this.chatService.afficherConversation(this.employe?._id,this.employeSelected._id).subscribe(res=>{
        if(res)
          this.messages = res.messages 
        else this.messages= []
      })
    })

  }


  ngOnInit(): void {

    
    this.scrollToBottom();


    this.authService.getAuth().subscribe((employe) => {
      this.employe = employe;
    });

    this.socketService.listen('newMsg').subscribe((msg) => {
      if (msg)
      {
        this.numberOfMessagesChanged = true;
        this.messages?.push(msg) 
      } 
    });

    this.socketService.listen('enLigne').subscribe(res=>{
      for (const user of res) {
        this.enLigne.push(user.id)
      }
      console.log(res)
    })

    this.createForm();
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

  messageNonLue(){
    let nonLue = []
    for (var i =  this.messages.length - 1; i >= 0; i--) {
      const msg =  this.messages[i]
      if(msg.lue==true && msg.envoyeur!=this.employe?._id)
      break
      if(msg.envoyeur!=this.employe?._id)
      nonLue.push(msg._id)
  }

    if(nonLue.length>0)
    this.chatService.modifierMessages(this.employe?._id,this.employeSelected?._id,nonLue).subscribe(res=>{
      if(res)
      console.log(res)
    })
  }

  close() {
     this.user= null ;
  }
}

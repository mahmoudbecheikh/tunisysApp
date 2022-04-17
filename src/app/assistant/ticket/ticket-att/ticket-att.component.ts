import { Component, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TicketService } from 'src/app/services/ticket.service';
import { Ticket } from 'src/models/ticket';
import { Router } from '@angular/router';
import { Departement } from 'src/models/departement';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DepartementService } from 'src/app/services/departement.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-ticket-att',
  templateUrl: './ticket-att.component.html',
  styleUrls: ['./ticket-att.component.css'],
})
export class TicketAttComponent implements OnInit {
  tickets: Ticket[] = [];
  departements: Departement[] = [];
  myForm: FormGroup = new FormGroup({});
  attachmentList: any = [];
  files: any = [];

  sujet: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);
  departement: FormControl = new FormControl('', Validators.required);
  description: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(15),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  emailClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('.*com$'),
  ]);
  nomClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  telClient: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    Validators.pattern('^[234579][0-9]*$'),
  ]);

  siteWeb: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  adresse: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.pattern("([a-zA-Z',.-]+( [a-zA-Z',.-]+)*)"),
  ]);

  manuel: FormControl = new FormControl('assistant');
  statut: FormControl = new FormControl('en attente');
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits?: string[];
  fruits: string[] = [];
  allFruits: string[] = [
    'Aardvark',
    'Albatross',
    'Alligator',
    'Alpaca',
    'Ant',
    'Anteater',
    'Antelope',
    'Ape',
    'Armadillo',
    'Donkey',
    'Baboon',
    'Badger',
    'Barracuda',
    'Bat',
    'Bear',
    'Beaver',
    'Bee',
    'Bison',
    'Boar',
    'Buffalo',
    'Butterfly',
    'Camel',
    'Capybara',
    'Caribou',
    'Cassowary',
    'Cat',
    'Caterpillar',
    'Cattle',
    'Chamois',
    'Cheetah',
    'Chicken',
    'Chimpanzee',
    'Chinchilla',
    'Chough',
    'Clam',
    'Cobra',
    'Cockroach',
    'Cod',
    'Cormorant',
    'Coyote',
    'Crab',
    'Crane',
    'Crocodile',
    'Crow',
    'Curlew',
    'Deer',
    'Dinosaur',
    'Dog',
    'Dogfish',
    'Dolphin',
    'Dotterel',
    'Dove',
    'Dragonfly',
    'Duck',
    'Dugong',
    'Dunlin',
    'Eagle',
    'Echidna',
    'Eel',
    'Eland',
    'Elephant',
    'Elk',
    'Emu',
    'Falcon',
    'Ferret',
    'Finch',
    'Fish',
    'Flamingo',
    'Fly',
    'Fox',
    'Frog',
    'Gaur',
    'Gazelle',
    'Gerbil',
    'Giraffe',
    'Gnat',
    'Gnu',
    'Goat',
    'Goldfinch',
    'Goldfish',
    'Goose',
    'Gorilla',
    'Goshawk',
    'Grasshopper',
    'Grouse',
    'Guanaco',
    'Gull',
    'Hamster',
    'Hare',
    'Hawk',
    'Hedgehog',
    'Heron',
    'Herring',
    'Hippopotamus',
    'Hornet',
    'Horse',
    'Human',
    'Hummingbird',
    'Hyena',
    'Ibex',
    'Ibis',
    'Jackal',
    'Jaguar',
    'Jay',
    'Jellyfish',
    'Kangaroo',
    'Kingfisher',
    'Koala',
    'Kookabura',
    'Kouprey',
    'Kudu',
    'Lapwing',
    'Lark',
    'Lemur',
    'Leopard',
    'Lion',
    'Llama',
    'Lobster',
    'Locust',
    'Loris',
    'Louse',
    'Lyrebird',
    'Magpie',
    'Mallard',
    'Manatee',
    'Mandrill',
    'Mantis',
    'Marten',
    'Meerkat',
    'Mink',
    'Mole',
    'Mongoose',
    'Monkey',
    'Moose',
    'Mosquito',
    'Mouse',
    'Mule',
    'Narwhal',
    'Newt',
    'Nightingale',
    'Octopus',
    'Okapi',
    'Opossum',
    'Oryx',
    'Ostrich',
    'Otter',
    'Owl',
    'Oyster',
    'Panther',
    'Parrot',
    'Partridge',
    'Peafowl',
    'Pelican',
    'Penguin',
    'Pheasant',
    'Pig',
    'Pigeon',
    'Pony',
    'Porcupine',
    'Porpoise',
    'Quail',
    'Quelea',
    'Quetzal',
    'Rabbit',
    'Raccoon',
    'Rail',
    'Ram',
    'Rat',
    'Raven',
    'Red deer',
    'Red panda',
    'Reindeer',
    'Rhinoceros',
    'Rook',
    'Salamander',
    'Salmon',
    'Sand Dollar',
    'Sandpiper',
    'Sardine',
    'Scorpion',
    'Seahorse',
    'Seal',
    'Shark',
    'Sheep',
    'Shrew',
    'Skunk',
    'Snail',
    'Snake',
    'Sparrow',
    'Spider',
    'Spoonbill',
    'Squid',
    'Squirrel',
    'Starling',
    'Stingray',
    'Stinkbug',
    'Stork',
    'Swallow',
    'Swan',
    'Tapir',
    'Tarsier',
    'Termite',
    'Tiger',
    'Toad',
    'Trout',
    'Turkey',
    'Turtle',
    'Viper',
    'Vulture',
    'Wallaby',
    'Walrus',
    'Wasp',
    'Weasel',
    'Whale',
    'Wildcat',
    'Wolf',
    'Wolverine',
    'Wombat',
    'Woodcock',
    'Woodpecker',
    'Worm',
    'Wren',
    'Yak',
    'Zebra',
  ];
  tags : FormControl = new FormControl()
  formTag : FormGroup = new FormGroup({})

  @ViewChild('fruitInput') fruitInput?: ElementRef<HTMLInputElement>;
  formdata = new FormData();
  constructor(
    private ticketService: TicketService,
    private router: Router,
    private depService: DepartementService
  ) {}

  ngOnInit(): void {
    this.afficherListe();
    this.createForm();
    this.afficherDepartements();
    this.formTag = new FormGroup({
      tags: this.tags
    });
    this.fruitCtrl.valueChanges.subscribe((res) => {
      if (res == '') this.filteredFruits = [];
      else {
        this.filterData(res);
      }
    });
  }

  filterData(enteredData: any) {
    if (enteredData) {
      this.filteredFruits = this.allFruits?.filter((item) => {
        return item.toLowerCase().indexOf(enteredData.toLowerCase()) > -1;
      });
    }
  }
  add(event: MatChipInputEvent): void {
    console.log('ena add');
    const value = (event.value || '').trim();
    if (value) {
      this.fruits.push(value);
    }
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event: any): void {
    console.log('ena selected');
    this.fruits.push(event);
    if (this.fruitInput) this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
    this.filteredFruits = [];
  }

  afficherListe() {
    this.ticketService.afficherListe().subscribe((res) => {
      for (let i = 0; i < res.length; i++) {
        const ticket = res[i];
        if (ticket.statut == 'en attente') this.tickets.push(ticket);
      }
    });
  }

  ajouter() {
    this.ticketService.ajouter(this.myForm.value).subscribe((res) => {
      if (res) {
        this.formdata.append('id', res._id);
        this.ticketService.confirmer(res._id).subscribe((response) => {
          this.ticketService.uploadFiles(this.formdata).subscribe((files) => {
            console.log(files);
          });
          this.formdata.delete('files');
          this.myForm.reset();
          this.files = [];
        });
      }
    });
  }

  createForm() {
    this.myForm = new FormGroup({
      sujet: this.sujet,
      departement: this.departement,
      emailClient: this.emailClient,
      nomClient: this.nomClient,
      telClient: this.telClient,
      description: this.description,
      manuel: this.manuel,
      statut: this.statut,
      siteWeb: this.siteWeb,
      adresse: this.adresse,
    });
  }

  afficherDepartements() {
    this.depService.afficherListe().subscribe((res) => {
      console.log(res);
      this.departements = res;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tickets, event.previousIndex, event.currentIndex);
  }

  confirmer(id: any) {
    this.ticketService.confirmer(id).subscribe((res) => {
      if (res != null) this.afficherListe();
    });
  }

  consulter(id: any) {
    const link = ['assistant/tickets', id];
    this.router.navigate(link);
  }

  supprimer(id: any) {}

  uploadMultiple(event: any) {
    const files: FileList = event.target.files;
    for (let index = 0; index < files.length; index++) {
      const element = files[index];
      this.formdata.append('files', element);
      this.files.push(element.name);
    }
  }

  enregistrer(){
    console.log('aaa')
    this.tags.setValue(this.fruits)
    this.ticketService.modifierTags('6258d3ca071d6cee4bdd3f6f',this.formTag.value).subscribe(res=>{
      console.log(res)
    })
  }
}

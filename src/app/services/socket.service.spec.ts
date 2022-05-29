import { TestBed } from '@angular/core/testing';

import { SocketService } from './socket.service';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SocketService', () => {
  let service: SocketService;
  const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, SocketIoModule.forRoot(config) ],
      providers: [ SocketService ]

    });
    service = TestBed.inject(SocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

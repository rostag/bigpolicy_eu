import { Router } from '@angular/router';
import { DialogService } from '../dialog/dialog.service';
import { inject, TestBed } from '@angular/core/testing';
import { LeaderService } from './leader.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjectService } from '../project/project.service';
import { TaskService } from '../task/task.service';
import { HttpClientModule, HttpXhrBackend} from '@angular/common/http';

describe('LeaderService', () => {

  beforeEach(() => {
    // Create a testing module
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        LeaderService, ProjectService, TaskService, DialogService, MatDialog,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: HttpXhrBackend }
      ]
    });
  });

  describe('getLeadersPage(groupId, page, limit, dbQuery)', () => {

    it('should return an Observable<Array<ILeader>>',
      inject([LeaderService, HttpXhrBackend], (leaderService, mockBackend) => {
        mockBackend.connections.subscribe((connection) => {
          // FIXME
          connection.mockRespond(new Response());
        });

        leaderService.getLeadersPage(1, 1, '{ "email": "some@email.com" }')
          .subscribe((leaders) => {
            expect(leaders.docs).toBeTruthy();
            expect(leaders.docs.length).toBe(3);
          });

      }));
  });
  // Guide to writing service tests. Link:
  // https://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html
});

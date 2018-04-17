// WIP: This is the beginning or first Service Test

import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../shared/dialog/dialog.service';
import { inject, TestBed } from '@angular/core/testing';
import { LeaderService } from './leader.service';
import { MatDialog } from '@angular/material';
// FIXME NG45 - Where's the MockBackend in new HttpClient?
import { MockBackend } from '@angular/http/testing';
import { ProjectService } from '../project/project.service';
import { TaskService } from '../task/task.service';
import { HttpClientModule, HttpXhrBackend, HttpResponse } from '@angular/common/http';

describe('LeaderService', () => {

  beforeEach(() => {
    // Create a testing module
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        LeaderService, ProjectService, TaskService, DialogService, MatDialog,
        { provide: Router, useClass: class { navigate = jasmine.createSpy('navigate'); } },
        { provide: HttpXhrBackend, useClass: MockBackend }
      ]
    });
  });

  describe('getLeadersPage(groupId, page, limit, dbQuery)', () => {

    it('// WIP: should return an Observable<Array<ILeader>>',
      inject([LeaderService, HttpXhrBackend], (leaderService, mockBackend) => {

        const mockResponse = {
          'docs': [
            {
              '__v': 1, '_id': '5811b39ebdaefca65f65c043',
              'email': 'rostislav.siryk@gmail.com', 'mission': 'bn',
              'name': 'Родріго', 'parentName': '', 'surName': 'Кручений', 'totalDonationsReceived': 140,
              'videoUrl': 'https://www.youtube.com/watch?v=3LKMwkuK0ZE', 'vision': 'fg',
              'donations': ['58926494229e3368477c27f2', '5896092087d93dfb16c60ac1'],
              'leaderFiles': [
                { 'name': 'Abingdon.pdf', 'link': 'https://drive.google.com/file/d/0B-BtyFkmQkLHbHN3d0Z6Y0FuOFk/view?usp=drivesdk' }
              ],
              'projectIds': ['5817073c41a8db05ab80f250', '581a6dbcc042e71cb07cbca1']
            }, {
              '__v': 1, '_id': '58a0cf21dab2ecbe50b26ed5', 'email': 'rostyslav.siryk@globallogic.com',
              'mission': 'Зменшити вплив політики на владу.',
              'name': 'Павло', 'parentName': ' ', 'surName': 'Перебийніс', 'totalDonationsReceived': 70,
              'vision': 'Провести реформу політики.', 'donations': ['58cf745570baf2feb2fa08cd'],
              'leaderFiles': [
                { 'name': 'Abingdon.pdf', 'link': 'https://drive.google.com/file/d/0B-BtyFkmQkLHbHN3d0Z6Y0FuOFk/view?usp=drivesdk' },
                { 'name': 'Auduino.png', 'link': 'https://drive.google.com/file/d/0B-BtyFkmQkLHYmFmUmUxU0xnQjg/view?usp=drivesdk' }
              ],
              'projectIds': ['58a0cf8cdab2ecbe50b26ed6']
            }, {
              '__v': 1, '_id': '589d8925dab2ecbe50b26ed2', 'email': 'rostyslav.siryk@gmail.com',
              'mission': 'Змусити політиків відповідати.\n\ns\nd g\nsf\nh \ns\nh',
              'name': 'Віталій', 'parentName': ' ', 'surName': 'Приходько', 'totalDonationsReceived': 0,
              'vision': 'Занадто багато дешево безвідповідальної політики.\n\n\nda sg\n\nas \ngsa\n \nh', 'donations': [],
              'leaderFiles': [],
              'projectIds': ['58cec544dd6a95d9520e148c', '58cec548dd6a95d9520e148d', '58cec54cdd6a95d9520e148e']
            }
          ],
          'total': 3, 'limit': 3, 'page': 1, 'pages': 1
        };

        mockBackend.connections.subscribe((connection) => {
          // FIXME
          connection.mockRespond(new Response(
            // {
            // FIXME body: JSON.stringify(mockResponse)
            // }
          ));
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

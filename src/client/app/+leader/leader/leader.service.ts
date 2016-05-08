import {Injectable} from 'angular2/core';

import {Leader} from '../leader/leader';
import {LEADERS} from '../leaders/mock-leaders';

@Injectable()
export class LeaderService {
	getLeaders() {
		return Promise.resolve(LEADERS);
	}

	getLeader(id: number) {
		return Promise.resolve(LEADERS).then(
			leaders => leaders.filter(leader => leader.id === id)[0]
  		)
	}

	// Slow connection simulation:
	getLeadersSlowly() {
		return new Promise<Leader[]>(resolve =>
			setTimeout(() => resolve(LEADERS), 2000) // 2 seconds
		);
	}
}
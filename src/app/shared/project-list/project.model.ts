export class ProjectModel {
  title: string;
  description: string;
  cost: number;
  managerName: string;
  managerId: number;
  dateStarted: Date = new Date();
  dateEnded: Date = new Date();
  iconURL: string;
}

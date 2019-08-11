import { IProject } from '../models';

export class ProjectModel implements IProject {
  _id: string;
  title: string;
  description: string;
  cost = 1;
  managerName = 'John Doe';
  managerId = '';
  managerEmail = '';
  imageUrl = '';
  // String type is used for conversion between DB and Date input formats
  dateStarted: string = this.toDateInputValue(new Date());
  dateEnded: string = this.toDateInputValue(new Date());
  videoUrl = '';
  taskIds;
  donations;
  totalDonationsReceived = 0;

  /**
   * It's necessary to have a string representation for sending it to DB
   * @returns String Serialized Leader
   */
  toString() {
    return JSON.stringify({
      title: this.title,
      description: this.description,
      cost: this.cost,
      managerName: this.managerName,
      managerId: this.managerId,
      managerEmail: this.managerEmail,
      dateStarted: this.dateStarted,
      dateEnded: this.dateEnded,
      imageUrl: this.imageUrl,
      videoUrl: this.videoUrl,
      taskIds: this.taskIds,
      totalDonationsReceived: this.totalDonationsReceived
    });
  }

  /**
   * Adopts date from Mongo DB format for UI datepicker
   */
  private toDateInputValue(dateToParse) {
    const date = new Date(dateToParse);
    const local = new Date(dateToParse);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    // Convert date string like this: 2017-03-19T13:11:33.615Z into this: 2017-03-19
    return local.toJSON().slice(0, 10);
  }

  /**
   * Populates model from a JSON representation loaded from DB
   */
  // FIXME Rework to be Project Reducer / Service method
  parseData(data) {
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        this[item] = data[item];
      }
    }
    this.dateStarted = this.toDateInputValue(this.dateStarted);
    this.dateEnded = this.toDateInputValue(this.dateEnded);
  }

  // FIXME Move to be Project Reducer / Service method
  onImageUrlChange(newUrlValue) {
    // console.log('Project image url:', newUrlValue);
    this.imageUrl = newUrlValue;
  }
}

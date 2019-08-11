import { ITask } from '../models';

export class TaskModel implements ITask {
  _id: string;
  title: string;
  description: string;
  cost = 1;
  projectId = '';
  project = null;
  imageUrl: string;
  videoUrl: string;
  // String type is used for conversion between DB and Date input formats
  dateStarted: string = this.toDateInputValue(new Date());
  dateEnded: string = this.toDateInputValue(new Date());
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
      projectId: this.projectId,
      dateStarted: this.dateStarted,
      dateEnded: this.dateEnded,
      imageUrl: this.imageUrl,
      videoUrl: this.videoUrl,
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

  parseData(data) {
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        this[item] = data[item];
      }
    }
    this.dateStarted = this.toDateInputValue(this.dateStarted);
    this.dateEnded = this.toDateInputValue(this.dateEnded);
  }
}

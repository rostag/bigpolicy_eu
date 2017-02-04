export class TaskModel {
  _id: string;
  title: string;
  description: string;
  cost = 1;
  projectId = '';
  project = null;
  iconURL: string;
  videoUrl: string;
  dateStarted: Date = new Date();
  dateEnded: Date = new Date();
  startDateInputValue: string = this.toDateInputValue(this.dateStarted);
  endDateInputValue: string = this.toDateInputValue(this.dateEnded);
  donations;
  totalDonationsReceived: Number = 0;

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
      dateStarted: this.startDateInputValue,
      dateEnded: this.endDateInputValue,
      iconURL: this.iconURL,
      videoUrl: this.videoUrl,
      totalDonationsReceived: this.totalDonationsReceived
    });
  }

  /**
   * Populate model from a json representation loaded from DB
   */
  parseData(data) {
    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        this[item] = data[item];
      }
    }
    this.startDateInputValue = this.toDateInputValue(this.dateStarted);
    this.endDateInputValue = this.toDateInputValue(this.dateEnded);
  }

  // FIXME Convert to Utility function
  private toDateInputValue(dateToParse) {
    const date = new Date(dateToParse);
    const local = new Date(dateToParse);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
  }

}

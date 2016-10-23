export class ProjectModel {
  _id:string;
  title: string;
  description: string;
  cost: number;
  managerName: string = 'John Doe';
  managerId: string = 'johndoe@mail.com';
  iconURL: string;
  dateStarted: Date = new Date();
  dateEnded: Date = new Date();
  startDateInputValue: string = this.toDateInputValue(this.dateStarted);
  endDateInputValue: string = this.toDateInputValue(this.dateEnded);
  videoUrl: string = '';
  email: any = {};

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
      dateStarted: this.startDateInputValue,
      dateEnded: this.endDateInputValue,
      iconURL: this.iconURL,
      videoUrl: this.videoUrl
    })
  }

  /**
   * Populate model from a json representation loaded from DB
   */
  parseData(data) {
    for (var item in data) {
      this[item] = data[item]
    }
    this.startDateInputValue = this.toDateInputValue(this.dateStarted);
    this.endDateInputValue = this.toDateInputValue(this.dateEnded);
  }

  private toDateInputValue(dateToParse) {
    var date = new Date(dateToParse)
    var local = new Date(dateToParse)
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return local.toJSON().slice(0,10)
  }
}

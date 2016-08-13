export class ProjectModel {
  _id:string;
  title: string;
  description: string;
  cost: number;
  managerName: string = 'Manager Absent';
  managerId: string = '-1';
  iconURL: string;
  dateStarted: Date = new Date();
  dateEnded: Date = new Date();
  startDateInputValue: string = this.toDateInputValue(this.dateStarted);
  endDateInputValue: string = this.toDateInputValue(this.dateEnded);

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
      iconURL: this.iconURL
    })
  }

  /**
   * It's necessary to have a string representation for sending it to DB
   * @returns String Serialized Leader
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

export class DonationModel {
	// TODO
  _id: string;
  virtual = false;
  donorId: string;
  targetId: string;
  // FIXME transactionId in external system. Use for completeness check.
  externalId: string;
  // Leader, Project, or Task
  targetType: string;
  amount: number;
  // FIXME Indirect pointer to transaction completeness.
  // Fill this date after transaction has been completeted in external payment system
  dateStarted: Date;
  dateCompleted: Date;
  description: string;
  status = 'unfinished';
  // Not stored in DB. Used as backlink for liqpay.
  result_url: String;
  server_url: String;

  toString() {
    return JSON.stringify({
      _id: this._id,
      donorId: this.donorId,
      virtual: this.virtual,
      targetId: this.targetId,
      externalId: this.externalId,
      targetType: this.targetType,
      amount: this.amount,
      dateStarted: this.dateStarted,
      dateCompleted: this.dateCompleted,
      description: this.description,
      result_url: this.result_url,
      server_url: this.server_url,
      status: this.status
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
  }
}

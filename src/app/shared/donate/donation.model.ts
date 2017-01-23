export class DonationModel {
	// TODO
	_id: string;
	donorId: string;
	targetId: string;
	// transactionId in external system
	externalId: string;
	// Leader, Project, or Task
	targetType: string;
	amount: number;
	dateStarted: Date;
	dateCompleted: Date;
	description: string;

	startDateInputValue: string = this.toDateInputValue(this.dateStarted);
	endDateInputValue: string = this.toDateInputValue(this.dateCompleted);

	/**
	 * It's necessary to have a string representation for sending it to DB
	 * @returns String Serialized Donation
	 */
	toString() {
		return JSON.stringify({
			donorId: this.donorId,
			targetId: this.targetId,
			externalId: this.externalId,
			targetType: this.targetType,
			amount: this.amount,
			dateStarted: this.toDateInputValue(this.dateStarted),
			dateEnded: this.toDateInputValue(this.dateCompleted),
			description: this.description
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
		this.endDateInputValue = this.toDateInputValue(this.dateCompleted);
	}

	private toDateInputValue(dateToParse) {
		if (!dateToParse) {
			return '';
		}
		var date = new Date(dateToParse)
		var local = new Date(dateToParse)
		local.setMinutes(date.getMinutes() - date.getTimezoneOffset())
		return local.toJSON().slice(0,10)
	}
}

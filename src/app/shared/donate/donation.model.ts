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

}

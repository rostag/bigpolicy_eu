export interface ILeader {
    _id: string;
    // personal info
    name: string;
    surName: string;
    parentName: string;
    vision: string;
    mission: string;
    email: string;
    videoUrl: string;
    photo: string;
    donations: any[];
    projects: string[]; // TODO Must be renamed to projectIds
    leaderFiles: any[];
    totalDonationsReceived: number;
    // id of party from parties list
    party: number;
    officialPost: string;
    // other
    socialNetworks: string;
    skills: string;
    // important personal documents
    docActionPlan: string;
    docElectionProgram: string;
    docPropertyDeclaration: string;
    docCriminalRecord: string;
    docCorruptionRecord: string;
    docPassport: string;
}

export class IProject {
    _id: string;
    title: string;
    description: string;
    cost: number;
    managerName: string;
    managerId: string;
    managerEmail: string;
    imageUrl: string;
    dateStarted: string;
    dateEnded: string;
    videoUrl: string;
    tasks: string[]; // TODO Must be renamed to taskIds
    donations: any[];
    totalDonationsReceived: number;
}

export interface ITask {
    _id: string;
    title: string;
    description: string;
    cost: number;
    projectId: string;
    project: string;
    imageUrl: string;
    videoUrl: string;
    dateStarted: string;
    dateEnded: string;
    donations: any[];
    totalDonationsReceived: number
};

export interface IResponsePage<T> {
    docs: T[];
    limit: number;
    page: number;
    pages: number;
    total: number;
}

export interface ILeaderResponsePage extends IResponsePage<ILeader> {
    docs: ILeader[];
    limit: number;
    page: number;
    pages: number;
    total: number;
}
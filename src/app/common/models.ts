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
    projects: IProject[];
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
    tasks: ITask[];
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

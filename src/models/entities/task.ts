export enum Priority {
    Low = 'low',
    Medium = 'medium',
    High = 'high',
    VeryHigh = 'very high'
}

export enum Status {
    IN_PROGRESS = 'in progress',
    PENDING = 'pending',
    DELAYED = 'delayed',
    COMPLETED = 'completed'
}

export type TaskProps = {
    id: string,
    userId: string,
    title: string,
    description?: string,
    priority: Priority
    status: Status,
    created_at?: Date,
    completed_on?: Date
}

export default class Task {
    private constructor(private props: TaskProps) {}

    public static create(
        userId: string, 
        title: string, 
        description?: string, 
        priority: Priority = Priority.Medium, 
        status: Status = Status.PENDING
    ) {
        const id = crypto.randomUUID().toString();
        return new Task({
            id,
            userId,
            title,
            description,
            priority,
            status
        })
    }

    private static with(id: string,
                        userId: string,
                        title: string, 
                        description: string, 
                        priority: Priority, 
                        status: Status, 
                        created_at?: Date, 
                        completed_on?: Date
    ) {
        return new Task({
            id,
            userId,
            title,
            description,
            priority,
            status,
            created_at,
            completed_on
        })
    }

    public get id(): string {return this.props.id};
    public get title(): string {return this.props.title};
    public get description(): string | undefined {return this.props.description};
    public get priority(): Priority {return this.props.priority};
    public get status(): Status {return this.props.status};
    public get created_at(): Date | undefined {return this.props.created_at};
    public get completed_on(): Date | undefined {return this.props.completed_on};
}
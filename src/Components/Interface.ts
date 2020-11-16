export const InitialData: IDoubt[] = [
    {
        id: "1",
        user: {
            id: "123",
            name: "navendu",
        },
        content: {
            sub: "doubt physics",
            content: "I have a doubt in physics",
            screenShot: "abc.jpg",
            subject: "Physics",
            replies: [
                {
                    user: {
                        id: "123",
                        name: "navendu",
                    },
                    reply: "hey i know the answer",
                    replied_at: "10 Nov 2020",
                },
            ],
        },
        submitted_at: "10 Nov 2020",
    },
    {
        id: "2",
        user: {
            id: "123",
            name: "navendu",
        },
        content: {
            sub: "doubt chemistry",
            content: "I have a doubt in Chemistry",
            screenShot: "abc.jpg",
            subject: "Chemistry",
            replies: [
                {
                    user: {
                        id: "123",
                        name: "navendu",
                    },
                    reply: "hey i know the answer",
                    replied_at: "10 Nov 2020",
                },
            ],
        },
        submitted_at: "10 Nov 2020",
    },
    {
        id: "3",
        user: {
            id: "123",
            name: "navendu",
        },
        content: {
            sub: "doubt chemistry",
            content: "I have a doubt in maths",
            screenShot: "abc.jpg",
            subject: "Maths",
            replies: [
                {
                    user: {
                        id: "123",
                        name: "navendu",
                    },
                    reply: "hey i know the answer",
                    replied_at: "10 Nov 2020",
                },
            ],
        },
        submitted_at: "10 Nov 2020",
    },
];

export type subject = "Physics" | "Chemistry" | "Maths";

export interface IUser {
    id: string;
    name: string;
}

export interface IReply {
    user: IUser;
    reply: string;
    replied_at: string;
}

export interface IContent {
    sub: string;
    content: string;
    screenShot?: string;
    subject: subject | string;
    replies?: IReply[];
}

export interface IDoubt {
    id: string;
    user: IUser;
    content: IContent;
    submitted_at: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    date: string;
    status: 'new' | 'read' | 'replied';
}

export const allMessages: ContactMessage[] = [];

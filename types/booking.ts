export type BookingType = {
    id: string;
    date: Date;
    time: string;
    numberOfPeople: number;
    customer?: {             
        id: string,
        email: string
    }
    customerId?: string,
}
import { BookingType } from "../types/booking";
import { toBookingType } from "../mapper/toBookingType";
import prisma from "../prisma";

export interface IBookingRepository {
    findOne(id: string, date: Date, time: string): Promise<BookingType | null>,        //type might be booking validation type
    create(id: string, date: Date, time: string, numberOfPeople: number): Promise<BookingType>,
    find(id:string): Promise<BookingType[]>,
    findAll(): Promise<BookingType[]>
}

export class BookingRepositoryPrisma implements IBookingRepository {
    async findOne(id:string, date: Date, time: string): Promise<BookingType | null>{
        const existingBooking = await prisma.booking.findFirst({
            where: {
                customerId: Number(id),
                date: date,
                time: time
            }
        });
        
        if(!existingBooking) return null;

        return toBookingType(existingBooking);
    }

    async create(id: string, date: Date, time: string, numberOfPeople: number): Promise<BookingType>{
        const newBooking = await prisma.booking.create({
            data: {
                customerId: Number(id),
                date,
                time,
                numberOfPeople
            }
        });
        return toBookingType(newBooking);
    }

    async find(id: string): Promise<BookingType[]>{
        const myBookings = await prisma.booking.findMany({
            where:{
                customerId: Number(id),
            },
            include: { 
                customer: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            },
            orderBy: [
                {date: 'asc'},
                {time: 'asc'}
            ]
        });
        return myBookings.map((booking: any) => toBookingType(booking));
    }

    async findAll(): Promise<BookingType[]> {
        const bookings = await prisma.booking.findMany({
            include: { 
                customer: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            },
            orderBy: [
                {date: 'asc'},
                {time: 'asc'}
            ]
        })
        return bookings.map((booking: any) => toBookingType(booking));
    }
}
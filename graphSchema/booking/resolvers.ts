import { BookingRepositoryPrisma } from "../../repository/bookingRepository";
import { UserRepositoryPrisma } from "../../repository/userRepository";
import { BookingService } from "../../services/booking/bookingService";
import { requireAuth } from "../../utils/checkRole";
import bookingValidation from "../../validation/bookingValidation";
import { AppError } from "../../utils/AppError";
import { UserService } from "../../services/user/userService";

const userRepository = new UserRepositoryPrisma();
const bookingRepository = new BookingRepositoryPrisma();
const bookingService = new BookingService(bookingRepository);
const userService = new UserService(userRepository);

export const bookingResolvers = {
    Query: {
        getMyBookings: async(parent:any, args: any, context: any) => {
            requireAuth(context, ['customer']);
            return await bookingService.myBooking(context.user.id);
        },

        getAllBookings: async(parent: any, args: any, context: any) => {
            requireAuth(context, ['manager', 'admin']);
            return await bookingService.allBooking();
        }
    },

    Mutation: {
        bookTable: async(parent: any, args: {input: {date: String, time: String, numberOfPeople: number}}, context: any) => {
            requireAuth(context, ['customer']);

            const {date, time, numberOfPeople} = bookingValidation.parse(args.input);
            const bookingDateTime = new Date(`${date}T${time}`);
            const now = new Date();
            
            if(bookingDateTime <= now){
                throw new AppError("You can only book for a future date and time", 400);
            }
            
            const id = context.user.id;       

            return await bookingService.bookTable(id, date, time, numberOfPeople);
        }
    },

    // the key is to return the foriegn key (customerId) instead of actual customer so that we can use it on our resolver
    Booking: {
        customer: async(parent: any, args: any, context: any) => {
            return await userService.viewUserProfile(parent.customerId);
            // since we are returning "customerId" from the PARENT i.e bookings(booktalbe, view booking) we can use that customerId to fetch the whole user information
        }
    }
}
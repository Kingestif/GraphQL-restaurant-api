import { Roles } from "../types/roles";
import { AppError } from "./AppError";

export const requireAuth = (context: any, accessRoles: Roles[]) => {
    if (!context.user) throw new AppError("Authentication required", 401);

    const currentUserRole = context.user.role;
    if (!accessRoles.includes(currentUserRole)) {
        throw new AppError('You are not authorized to do this operation', 403);
    }
}
import { MenuRepositoryPrisma } from "../../repository/menuRepository";
import { MenuService } from "../../services/menu/menuServices";
import { AppError } from "../../utils/AppError";
import { requireAuth } from "../../utils/checkRole";
import { menuValidation, updateValidation } from "../../validation/menuValidation";
import { idValidation } from "../../validation/userValidation";

const menuRepository = new MenuRepositoryPrisma();
const menuService = new MenuService(menuRepository);
export const menuResovers = {
    Query: {
        getMenu: async(parent:any, args:any, context:any) => {
            requireAuth(context, ['customer', 'manager', 'admin']);
            return await menuService.getMenu();
        }
    },

    Mutation: {
        postMenu: async(parent:any, args:any, context:any) => {
            requireAuth(context, ['admin']);
            const menu = menuValidation.parse(args.input);
            return await menuService.postMenu(menu);
        },

        editMenu: async(parent:any, args:any, context:any) => {
            requireAuth(context, ['admin']);
            const updateData = updateValidation.parse(args.input);
            const id = args.input.id;
            return await menuService.editMenu(id, updateData);
        },

        deleteMenu: async(parent:any, args:any, context:any) => {
            requireAuth(context, ['admin']);
            const id = idValidation.parse(args.id);
            return await menuService.deleteMenu(id);
        }
    }
}
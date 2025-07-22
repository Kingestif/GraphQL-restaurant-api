export type MenuType = {
    id?: string,            
    name: string,
    description: string,
    price: number,
    category: string,
    available: boolean
}

export type MenuUpdateType = Partial<MenuType>;   
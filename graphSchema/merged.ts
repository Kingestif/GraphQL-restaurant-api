import { mergeTypeDefs } from '@graphql-tools/merge';
import { mergeResolvers } from '@graphql-tools/merge';

import { orderTypeDefs } from "./order/typeDefs";
import { userTypeDefs } from "./user/typeDefs";
import { userResolvers } from './user/resolvers';
import { bookingTypeDefs } from './booking/typeDefs';
import { menuTypeDefs } from './menu/typeDefs';
import { itemTypeDefs } from './orderItem/typeDefs';
import { commonTypeDefs } from './common/typeDef';
import { baseTypeDefs } from './baseTypeDefs';
import { bookingResolvers } from './booking/resolvers';
import { menuResovers } from './menu/resolvers';

export const typeDefs = mergeTypeDefs([
    baseTypeDefs,
    userTypeDefs,
    orderTypeDefs,
    bookingTypeDefs,
    menuTypeDefs,
    itemTypeDefs,
    commonTypeDefs
]);

export const resolvers = mergeResolvers([
    userResolvers,
    bookingResolvers,
    menuResovers
]);
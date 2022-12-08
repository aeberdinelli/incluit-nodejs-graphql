const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { importSchema } = require('graphql-import');

let PeopleDB = [
    {
        name: "Alan Berdinelli",
        email: "aeberdinelli@gmail.com"
    },
    {
        name: "Pepe",
        email: "pepe@gmail.com"
    }
];

let ItemsDB = [
    {
        name: "Pepes",
        stock: 1
    }
];

let DB = [];

const resolvers = {
	Result: {
		__resolveType(params) {
			if (params.stock) {
				return 'Items';
			}
			if (params.email) {
				return 'People';
			}
			
            return 'Product';
		}
	},
    Query: {
        Search: (_, params) => {
            return [...ItemsDB, ...PeopleDB, ...DB].map(
                (item, id) => ({ 
                    ...item, 
                    id: id + 1 
                })
            );
        },
        ListProducts: () => {
            return DB.map((item, id) => ({ ...item, id: id + 1 }));
        },
        GetProduct: (_, params) => {
            return {
                ...DB[params.id],
                id: params.id
            }
        }
    },
    Mutation: {
        CreateProduct: (_, params) => {
            DB.push(params);

            return {
                ...params, 
                id: DB.length
            };
        },
        RemoveProduct: (_, params) => {
            DB.splice(params.id, 1);

            return DB.map((item, id) => ({ ...item, id: id + 1 }));
        },
    }
};

(async () => {
    const server = new ApolloServer({
        typeDefs: importSchema('./schema.graphql'),
        resolvers,
    });
    
    const { url } = await startStandaloneServer(server, {
        listen: { port: 3000 },
    });
    
    console.log(`GraphQL API Started: ${url}`);
})();
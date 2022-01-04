import { getUserData } from "./util.js";

let pageSize = 5;

export let endpoints = {
    recent: "/classes/Places?limit=3",
    recipes: (page) => `/classes/Places?skip=${(page - 1) * pageSize}&limit=${pageSize}`,
    recipesSearch: (page, query) => `/classes/Places?where=${createQuery(query)}&skip=${(page - 1) * pageSize}&limit=${pageSize}`,
    createRecipes: "/classes/Places",
    recipeDetails: (id) => `/classes/Places/${id}?include=owner`,
    commentsByRecipe: (recipeId) => `/classes/Comment?where=${createPointerQuery("places", "Places", recipeId)}&include=owner&order=-createdAt`,
    comments: "/classes/Comment",
    recipeById: '/classes/Places/',
};

export function createPointerQuery(propName, className, objectId) {
    return createQuery({
        [propName]: createPointer(className, objectId)
    })
};

export function createQuery(query) {
    return encodeURIComponent(JSON.stringify(query))
};

export function createPointer(className, objectId) {
    return {
        __type: "Pointer",
        className,
        objectId
    };
};

export function addOwner(record) {
    let { id } = getUserData();
    record.owner = createPointer("_User", id);

    return record;
};
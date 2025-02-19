import { PostModel } from "../schemas/post.js";

export async function recupererTousPosts() {
    console.log("PostModel", PostModel);
    console.log("recupererTousPosts");
    try {
        const listePosts = await PostModel.find();
        console.log("Nombre de posts récupérés:", listePosts.length);
        console.log("listePosts", listePosts);
        return listePosts;
    } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        throw error; 
    }
}




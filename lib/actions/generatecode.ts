"use server";
import { databases, storage } from "../appwrite";
import { appwriteConfig } from "../config";
import { ID } from "appwrite";

export const generateCode = async (params: FormData) => {
    const description = params.get("description") as string;
    const file = params.get("file") as File | null;
    const model = params.get("model") as string;

    try {
        let imageUrl = null;
        
        // If a file is uploaded, process it
        if (file && file.size > 0) {
            const imageUpload = await storage.createFile(
                appwriteConfig.bucketId,
                ID.unique(),
                file
            );
            
            const imageId = imageUpload.$id;
            const projectId = appwriteConfig.projectId;
            
            imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.bucketId}/files/${imageId}/view?project=${projectId}`;
        }
        
        // Create document with or without image
        const document = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.collectionId,
            ID.unique(),
            {
                description,
                model,
                ...(imageUrl && { imageUrl }) // Only include imageUrl if it exists
            }
        );
                
        return { success: true, data: document };
    } catch (error: any) {
        console.error("Error in generateCode:", error);
        return { success: false, error: error.message };
    }
}
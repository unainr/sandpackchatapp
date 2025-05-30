"use server";

import OpenAI from "openai";
import { storage } from "../appwrite";
import { appwriteConfig } from "../config";
import { cleanCode, PROMPT_OLD } from "../utils";
import { ID } from "appwrite";
import { connectToDatabase } from "../db";
import { Code } from "@/model/code";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
	baseURL: process.env.OPEN_ROUTER_BASE_URL,
	apiKey: process.env.OPEN_ROUTER_API_KEY,
});
const imageconvert = async (url: string | any) => {
	const file = url;
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

			return (imageUrl = `https://cloud.appwrite.io/v1/storage/buckets/${appwriteConfig.bucketId}/files/${imageId}/view?project=${projectId}`);
		}
		return null;
	} catch (error) {
		throw new Error("Failed to generate response" + error);
	}
};

export const ModelGenerate = async (
	description: string,
	imageUri: string | any
) => {
	try {
		const imageUrl = await imageconvert(imageUri);

		const completion = await openai.chat.completions.create({
			model: "google/gemma-3-12b-it:free",
			messages: [
				{
					role: "user",
					content: [
						{
							type: "text",
							text: description + PROMPT_OLD,
						},
						{
							type: "image_url",
							image_url: imageUrl,
						} as any,
					],
				},
			],
		});
		const rawCode = completion.choices[0].message.content;
		const compressedCode = cleanCode(rawCode);

		await connectToDatabase();
		const createdCode = await Code.create({
			code: compressedCode,
			imageUrl,
			createdAt: new Date(),
		});
		revalidatePath("/");
		revalidatePath("/generate");
		return {
			success: true,
			message: "data add successfully",
			id: createdCode._id.toString(),
		};
	} catch (error: any) {
		return {
			success: false,
			message: error.message,
		};
	}
};

export const getAllCodes = async () => {
	try {
		await connectToDatabase();
		const allCodes = await Code.find().sort({ createdAt: -1 }).lean();
		return JSON.parse(JSON.stringify(allCodes));
	} catch (error: any) {
		return { success: false, message: error.message };
	}
};
export const findCode = async (id: string) => {
	try {
		if (!id || id === undefined) return null;

		await connectToDatabase();
		const code = await Code.findById(id).lean();
		if (!code) {
			return { success: false, message: "Code not found" };
		}
		return JSON.parse(JSON.stringify(code));
	} catch (error: any) {
		return { success: false, message: "Code not found" };
	}
};
export const deleteCode = async (id: string) => {
	try {
		if (!id || id === undefined) return null;
		await connectToDatabase();
		const code = await Code.findByIdAndDelete(id);
		if (!code) {
			return { success: false, message: "Code not found" };
		}
		revalidatePath("/");
		revalidatePath("/generate");
		return { success: true, message: "Code deleted successfully" };
	} catch (error: any) {
		return { success: false, message: "Code not found" };
	}
};

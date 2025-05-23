"use client";

import { ArrowRight, Loader2, Paperclip, X } from "lucide-react";
import { useState, useRef, useCallback, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModelGenerate } from "@/lib/actions/model";
import { useRouter } from "next/navigation";
import { UseAutoResizeTextareaProps } from "@/types";
import { TextShimmerWave } from "./shimer/text-shimmer";

function useAutoResizeTextarea({
	minHeight,
	maxHeight,
}: UseAutoResizeTextareaProps) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustHeight = useCallback(
		(reset?: boolean) => {
			const textarea = textareaRef.current;
			if (!textarea) return;

			if (reset) {
				textarea.style.height = `${minHeight}px`;
				return;
			}

			textarea.style.height = `${minHeight}px`;

			const newHeight = Math.max(
				minHeight,
				Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY)
			);

			textarea.style.height = `${newHeight}px`;
		},
		[minHeight, maxHeight]
	);

	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = `${minHeight}px`;
		}
	}, [minHeight]);

	useEffect(() => {
		const handleResize = () => adjustHeight();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [adjustHeight]);

	return { textareaRef, adjustHeight };
}

export function AI_Prompt() {
	const router = useRouter();
	const [value, setValue] = useState<String | any>("");
	const [selectedFile, setSelectedFile] = useState<any>(null);
	const [preview, setPreview] = useState(null);
	const [Loading, setLoading] = useState(false);
	const handleFileChange = (event: any) => {
		const file = event.target.files[0];

		if (file) {
			setSelectedFile(file);

			// Create preview URL for image display
			const previewUrl: any = URL.createObjectURL(file);
			setPreview(previewUrl);
		}
	};

	const handleCancel = () => {
		setSelectedFile(null);
		setPreview(null);

		// Reset the file input value
		const fileInput: any = document.getElementById("image-upload");
		if (fileInput) {
			fileInput.value = "";
		}
	};
	const { textareaRef, adjustHeight } = useAutoResizeTextarea({
		minHeight: 72,
		maxHeight: 300,
	});

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey && value.trim()) {
			e.preventDefault();
			setValue("");
			adjustHeight(true);
			// Here you can add message sending
		}
	};
	const handelSubmit = async () => {
		if (!value.trim() && !selectedFile) return;
		setLoading(true);
		try {
			const response = (await ModelGenerate(value, selectedFile)) as any;
			if (response.success && response.id) {
				router.push(`/generate/${response.id}`);
			} else {
				// Handle error case
				console.error("Generation failed:", response.message);
				// You might want to show an error message to the user here
			}
			console.log(response);
		} catch (error) {
			throw new Error("Failed to generate response" + error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
		{Loading && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
    <TextShimmerWave
      className='[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF] text-xl font-medium"
      duration={1}
      spread={1}
      zDistance={1}
      scaleDistance={1.1}
      rotateYDistance={20}'
      duration={1}
      spread={1}
      zDistance={1}
      scaleDistance={1.1}
      rotateYDistance={20}
    >
       Generating your Code
    </TextShimmerWave>
  </div>
)}

		<div className="w-4/6 py-4">
			<div className="bg-black/5 dark:bg-white/5 rounded-2xl p-1.5">
				<div className="relative">
					<div className="relative flex flex-col">
						<div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
							<Textarea
								id="ai-input-15"
								name="description"
								value={value}
								placeholder={"What can I do for you?"}
								className={cn(
									"w-full rounded-xl relative rounded-b-none px-4 py-3 bg-black/5 dark:bg-white/5 border-none dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70 resize-none focus-visible:ring-0 focus-visible:ring-offset-0",
									"min-h-[72px]"
								)}
								ref={textareaRef}
								onKeyDown={handleKeyDown}
								onChange={(e) => {
									setValue(e.target.value);
									adjustHeight();
								}}
							/>
						</div>

						<div className="h-14 bg-black/5 dark:bg-white/5 rounded-b-xl flex items-center">
							<div className="absolute left-3 right-3 bottom-3 flex items-center justify-between w-[calc(100%-24px)]">
								<div className="flex items-center gap-2">
									{/* File upload button - always visible */}
									<label
										className={cn(
											"rounded-lg p-2 bg-black/5 dark:bg-white/5 cursor-pointer",
											"hover:bg-black/10 dark:hover:bg-white/10 focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500",
											"text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white",
											"transition-colors duration-200 relative overflow-hidden"
										)}
										aria-label="Attach file">
										<input
											id="image-upload"
											name="file"
											type="file"
											className="hidden"
											accept="image/*"
											onChange={(e) => {
												// Clear the input value first if there was a previous file
												if (selectedFile) {
													e.target.value = "";
													// Force a re-render to ensure the onChange will fire again
													setTimeout(() => {
														handleFileChange(e);
													}, 0);
												} else {
													handleFileChange(e);
												}
											}}
											// Add key to force re-render when file is selected/canceled
											key={selectedFile ? "file-selected" : "no-file"}
										/>
										<Paperclip className="w-4 h-4 transition-colors" />

										{/* Add subtle animation/indicator when hovering */}
										<span className="absolute inset-0 bg-blue-500/10 opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg"></span>
									</label>
								</div>

								{/* Image preview - shown separately when an image is selected */}
								{selectedFile && preview && (
									<div className="absolute -bottom-1 left-14 flex items-center justify-start gap-2 bg-black/10 dark:bg-white/10 p-1.5 rounded-lg z-10 shadow-sm backdrop-blur-sm transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
										<div className="relative flex-shrink-0">
											<div className="w-10 h-10 overflow-hidden rounded-md border border-black/10 dark:border-white/10 shadow-sm">
												<img
													src={preview}
													alt="Preview"
													className="h-full w-full object-cover object-center"
												/>
											</div>
											<Button
												size={"icon"}
												onClick={() => {
													// Revoke object URL to prevent memory leaks
													if (preview) {
														URL.revokeObjectURL(preview);
													}

													setSelectedFile(null);
													setPreview(null);

													// Reset the file input value
													const fileInput = document.getElementById(
														"image-upload"
													) as HTMLInputElement;
													if (fileInput) {
														fileInput.value = "";
													}
												}}
												className="absolute text-xs -top-1 -right-1 z-10 flex items-center justify-center size-5 cursor-pointer bg-red-500 rounded-full shadow-md text-white hover:bg-red-600 transition-colors"
												aria-label="Remove image">
												<X size={12} />
											</Button>
										</div>
										<span className="text-xs text-black/70 dark:text-white/70 max-w-24 truncate">
											{selectedFile.name}
										</span>
									</div>
								)}

								<div className="flex items-center justify-end gap-3 w-10 h-10 flex-shrink-0">
									<Button
										type="button"
										className={cn(
											"rounded-lg p-2 bg-blue-600 hover:bg-blue-700 w-full h-full",
											"focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-blue-500",
											"transition-all duration-200",
											!value.trim() && !selectedFile
												? "opacity-50 cursor-not-allowed"
												: "opacity-100"
										)}
										aria-label="Send message"
										disabled={!value.trim() && !selectedFile}
										onClick={() => {
											handelSubmit();
											if (!value.trim() && !selectedFile) return;
											setValue("");
											if (selectedFile) {
												// Revoke object URL to prevent memory leaks
												if (preview) {
													URL.revokeObjectURL(preview);
												}
												setSelectedFile(null);
												setPreview(null);

												// Reset the file input
												const fileInput = document.getElementById(
													"image-upload"
												) as HTMLInputElement;
												if (fileInput) {
													fileInput.value = "";
												}
											}
											adjustHeight(true);
										}}>
										
											<ArrowRight
												className={cn(
													"w-4 h-4 text-white transition-opacity duration-200",
													value.trim() || selectedFile
														? "opacity-100"
														: "opacity-70"
												)}
											/>
										
									</Button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}

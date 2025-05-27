"use client";

import {
  LucideCalendar,
  LucideChevronRight,
  LucideCode,
  LucideExternalLink,
  LucideTag,
  LucideTrash2,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CodeBlockThemed } from "./mainblock";
import { deleteCode } from "@/lib/actions/model";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "./ui/button";

const CodeSnippet = ({ codeItem }: { codeItem: any }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!codeItem._id) return;
    
    try {
      setIsDeleting(true);
      setError(null);
      
      const result = await deleteCode(codeItem._id);
      
      if (result?.success) {
        setIsDeleted(true);
        router.refresh();
      } else {
        setError(result?.message || "Failed to delete code");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Don't render if deleted
  if (isDeleted) {
    return null;
  }

  return (
     <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="my-10 bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800 group relative"
    >
      {/* Animated hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Enhanced Image Section with glass morphism effect */}
      <div className="relative h-80 w-full overflow-hidden">
        {codeItem.imageUrl ? (
          <>
            <Image
              src={codeItem.imageUrl}
              alt="Code Preview"
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
              quality={100}
            />
            {/* Stylish overlay with multiple gradients */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-transparent to-black/50 mix-blend-multiply"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
            
            {/* Animated accent lines */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r rounded-full from-red-500 via-red-500 to-red-500 transform origin-left transition-transform duration-700 ease-out group-hover:scale-x-100 scale-x-0"></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-red-600 to-red-700">
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.3)_0%,transparent_70%)]"></div>
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <LucideCode className="w-24 h-24 text-red-500" />
            </div>
          </div>
        )}
        
        {/* Floating glass badges */}
        <div className="absolute top-4 left-4 transform transition-all duration-300 group-hover:translate-y-[-2px]">
          <span className="px-4 py-2 bg-white/10 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20 shadow-lg flex items-center gap-1.5">
            <LucideTag className="h-3.5 w-3.5" />
            Code Snippet
          </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center text-white/90 gap-3 backdrop-blur-sm bg-black/30 px-4 py-3 rounded-xl border border-white/10">
            <LucideCalendar className="h-4 w-4 text-white/70" />
            <span className="font-medium text-sm">
              {new Date(codeItem.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        {/* Code content with improved styling */}
        <div className="mb-6">
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            <CodeBlockThemed codesnippet={codeItem.code.substring(0, 200)} />
          </div>
          
        </div>
        
        {/* Action buttons with improved styling */}
        <div className="flex flex-wrap items-center gap-3 mt-6 pt-5 border-t border-gray-100 dark:border-gray-800/50">
          {/* View Code Button */}
          <Link href={`/generate/${codeItem._id}`} className="flex-1 min-w-[140px]">
            <Button className=" py-5 cursor-pointer bg-gradient-to-br from-red-600 to-indigo-700 hover:from-red-700 hover:to-indigo-800 text-white  flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-blue-500/20 group/view">
              <span>View Full Code</span>
              <LucideChevronRight className="h-4 w-4 transition-transform duration-300 group-hover/view:translate-x-1" />
            </Button>
          </Link>
          
          {/* Delete Button */}
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
			className="bg-red-500 hover:bg-red-600 text-white cursor-pointer"
          >
            <LucideTrash2 className="h-4 w-4 transition-transform duration-300 group-hover/delete:scale-110" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
        
        {/* Error message with improved styling */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-800/50 flex items-start gap-3"
          >
            <div className="p-1 bg-red-100 dark:bg-red-800/30 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
        <div className="absolute transform rotate-45 bg-gradient-to-r from-blue-500 to-purple-500 w-28 h-28 -top-14 -right-14 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
    </motion.div>
  );
};

export default CodeSnippet;

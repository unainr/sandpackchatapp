import { getAllCodes } from '@/lib/actions/model'
import React from 'react'
import CodeSnippet from '@/components/CodeSnippet'
import { AI_Prompt_Demo } from '@/components/ai-input'
import { Metadata } from 'next'

const Generate = async () => {
  const response = await getAllCodes() as string |any
  if(!response) return <div>No data found</div>
    return (
     <div className="container mx-auto px-4 pb-24 relative min-h-screen flex flex-col">
  {/* Main content area with flex-grow to push footer to bottom */}
  <div className="flex-grow my-14">
    <h1 className="text-3xl font-bold my-8 text-center">Generated Code Snippets</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {response && response?.map((codeItem: any) => (
        <CodeSnippet key={codeItem.id} codeItem={codeItem} />
      ))}
    </div>
  </div>
  
  {/* Fixed AI Prompt at bottom */}
  <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 py-3">
    <div className="container mx-auto flex justify-center items-center">
        <AI_Prompt_Demo />
      </div>
  </div>
</div>
    )
  } 


export default Generate


// Generate page metadata
export const metadata: Metadata = {
  title: "Generate Code | HiddenLeaf",
  description: "Create new code snippets with our AI assistant. Describe what you need and get instant results.",
};

export interface LayoutProps {
    children: React.ReactNode;
}

export interface Model {
    description:string;
    imageUrl: File|null|string;
}



export interface UseAutoResizeTextareaProps {
	minHeight: number;
	maxHeight?: number;
}
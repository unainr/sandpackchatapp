import Image from "next/image";

const Logo = () => {
	return (
		<>
			   <div className="relative w-10 h-10 overflow-hidden rounded-md shadow-lg transform group-hover:scale-105 transition-transform">
        <Image 
          src="/ms.png" 
          alt="HiddenLeaf Logo" 
          width={40} 
          height={40}
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-xl leading-tight uppercase italic tracking-tight text-gray-900 dark:text-white">
          hidden<span className="text-red-600"> leaf</span>
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1 tracking-wide">
          code playground
        </span>
      </div>
		</>
	);
};

export default Logo;

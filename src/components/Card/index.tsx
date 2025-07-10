const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg shadow-sm dark:shadow-none border border-gray-200 dark:border-gray-700/50 ${className}`}>
      {children}
    </div>
  );
  
  export default Card;
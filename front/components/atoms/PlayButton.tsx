interface PlayButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function PlayButton({
  onClick,
  disabled = false,
  className = "",
}: PlayButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-green-500 hover:bg-green-600 disabled:bg-gray-400 
        text-white font-bold py-3 px-6 rounded-full 
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
        disabled:cursor-not-allowed
        ${className}
      `}
      aria-label="Jouer la musique"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}

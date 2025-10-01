interface PauseButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function PauseButton({
  onClick,
  disabled = false,
  className = "",
}: PauseButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 
        text-white font-bold py-3 px-6 rounded-full 
        transition-colors duration-200 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
        disabled:cursor-not-allowed
        ${className}
      `}
      aria-label="Mettre en pause la musique"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-6 h-6"
      >
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
      </svg>
    </button>
  );
}

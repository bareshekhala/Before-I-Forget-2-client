import "../loader.css";

type LoaderProps = {
  size?: number;
  label?: string;
};

function Loader({ size = 96, label = "Loading" }: LoaderProps) {
  return (
    <div className="bif-loader" role="status">
      <svg viewBox="71 126.8 370 271.2" width={size} aria-hidden="true">
        <path className="bif-left" d="M253 392C201 358 141 350 77 362V138C141 126 201 134 253 168Z" />
        <g className="bif-right">
          <path d="M259 392C311 358 371 350 435 362V228.2L342.5 135.8C313 140.5 285 151 259 168Z" />
          <path className="bif-fold" d="M342.5 135.8L435 228.2H344.8Z" />
        </g>
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Loader;
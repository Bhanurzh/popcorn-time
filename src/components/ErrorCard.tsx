import { CircleAlert } from "lucide-react";

interface Props {
  customClassName?: string;
  noPadding?: boolean;
  error: string | null;
}
const ErrorCard: React.FC<Props> = ({ customClassName, error, noPadding }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        noPadding ? "" : "py-5 px-4"
      }`}
    >
      <div
        className={`${customClassName} bg-slate-500/10 flex justify-center items-center`}
      >
        <div className="flex md:flex-row flex-col items-center gap-3">
          <CircleAlert className="text-red-primary" size={40} />
          <p className="text-white lg:text-2xl text-xl capitalize">{error}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorCard;

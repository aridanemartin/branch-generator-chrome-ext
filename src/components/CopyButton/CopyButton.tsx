import copyIcon from "../../assets/images/icons/copyIcon.png";
import { toast } from "react-toastify";
import "./CopyButton.scss";

interface CopyButtonProps {
  branchName: string;
  buttonText: string;
  onSuccessMessage: string;
}

const CopyButton = ({
  branchName,
  buttonText,
  onSuccessMessage,
}: CopyButtonProps) => {
  const notify = () => toast(onSuccessMessage);

  return (
    <button
      className="copyButton"
      onClick={() => {
        navigator.clipboard.writeText(branchName);
        notify();
      }}
    >
      <img src={copyIcon} alt="Copy icon" />
      {buttonText}
    </button>
  );
};

export default CopyButton;

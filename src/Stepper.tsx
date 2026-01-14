import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { addPageVisit } from "./store/formSlice";
import { validateForm } from "./utils/validateForm";
import { withPrefix } from "./utils/withPrefix";

interface StepperProps {
  currentFormPage: string;
}

function Stepper({ currentFormPage }: StepperProps) {
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);

  const pageValidations = validateForm(formData);
  const getHashFromCurrentBrowserUrl = () => {
    const url = window.location.href;
    const hashIndex = url.indexOf("#");
    if (hashIndex !== -1) {
      let str = url
        .substring(hashIndex + 1)
        .replace("#", "")
        .replace("/", "")
        .replace("form_", "");
      if (str.indexOf("page") === -1) {
        str = "page1";
      }
      return str;
    } else {
      return "";
    }
  };

  let currentPageNumber = getHashFromCurrentBrowserUrl().replace("page", "");
  if (currentPageNumber === "") {
    currentPageNumber = "1";
  }

  return (
    <div className="relative">
      <div
        className={withPrefix(
          "bg-gray-200 m-4 w-[50%] m-auto flex mt-[6px] h-[4px] left-[calc(25%)] absolute"
        )}
      ></div>
      <div
        className={withPrefix("m-auto flex relative justify-between w-[50%]")}
      >
        {pageValidations.map((requirement: any, index: number) => {
          return (
            <div
              key={requirement.id}
              className={withPrefix("w-[15px] h-[15px]")}
              onClick={() => {
                navigate(
                  requirement.id === "/"
                    ? requirement.id
                    : `form_${requirement.id.replace("/", "")}`
                );
              }}
            >
              <div
                key={`stepper-status-${requirement.id}`}
                className={withPrefix([
                  "pf:justify-center",
                  index + 1 <= Number(currentPageNumber)
                    ? "w-[15px] h-[15px]"
                    : "w-[10px] h-[10px] mt-[2.5px] ml-auto",
                  "rounded-xl",
                  index + 1 <= Number(currentPageNumber)
                    ? "bg-green-600"
                    : "bg-gray-400",
                ])}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Stepper;

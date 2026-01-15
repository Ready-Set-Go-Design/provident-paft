import { useDispatch } from "react-redux";
import { addPageVisit } from "../store/formSlice";
import { Button } from "./button";
import { useLocation } from "react-router-dom";

function NavButton({
  action,
  label,
  disabled,
  outline,
  currentPage,
  disabledButClickable,
}: {
  action: Function;
  label: string;
  disabled?: boolean;
  currentPage?: string;
  outline?: boolean;
  fullWidth?: string;
  disabledButClickable?: boolean;
}) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        if (disabled) {
          action();
        }
      }}
    >
      <Button
        disabled={disabled}
        color={disabledButClickable ? "disabled" : "brand"}
        {...((outline as any) && { outline })}
        onClick={() => {
          action();
          if (disabledButClickable) {
            console.log("trying!");
            setTimeout(() => {
              window.scrollTo({
                top: document.body.scrollHeight,
                behavior: "smooth",
              });
            }, 100);
          }

          dispatch(addPageVisit(currentPage as string));
        }}
      >
        {label}
      </Button>
    </div>
  );
}

export default NavButton;

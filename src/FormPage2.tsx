import { useDispatch, useSelector } from "react-redux";
import { updateField } from "./store/formSlice";
import { RootState } from "./store/store";
import NavButton from "./components/NavButton";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import { Radio, RadioField, RadioGroup } from "./components/radio";
import { Description, Label } from "./components/fieldset";
import { withPrefix } from "./utils/withPrefix";
import { Checkbox, CheckboxField } from "./components/checkbox";
import { isPageValid } from "./utils/isPageValid";
import { AllFieldsRequiredMessage } from "./components/AllFieldsRequiredMessage";
import { validateForm } from "./utils/validateForm";
import { FooterWrapper } from "./components/FooterWrapper";

function FormPage2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = useSelector((state: RootState) => state.form);
  const [showValidationError, setShowValidationError] =
    useState<boolean>(false);
  const pageIsValid = isPageValid("/page2");
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const from = urlParams.get("from");
  const validatedForm = validateForm(formData).find(
    (requirement: any) => requirement.id === "/page2",
  );

  return (
    <div className={withPrefix("p-4 w-full max-w-[400px] m-auto pb-24")}>
      <h1 className={withPrefix("py-4 text-2xl")}>Pre-Authorized Payments</h1>

      <div>
        <RadioGroup
          className={withPrefix(
            "border-1 rounded-md pf:overflow-hidden p-2 pt-0",
            showValidationError && formData.payment_mode === ""
              ? "border-red-500"
              : "border-transparent",
          )}
          name="payment_mode"
          defaultValue="provide_banking_information"
          value={formData.payment_mode}
          onChange={(e) => {
            dispatch(
              updateField({
                field: "payment_mode",
                value: e,
              }),
            );
          }}
        >
          <RadioField>
            <Radio value="provide_banking_information" color="green" />
            <Label className={withPrefix("text-sm font-bold")}>
              Provide banking information
            </Label>
            <Description>
              Customers can provide their banking information for payments.
            </Description>
          </RadioField>
          <RadioField>
            <Radio value="provide_void_cheque" color="green" />
            <Label className={withPrefix("text-sm font-bold")}>
              Provide a void cheque
            </Label>
            <Description>
              Customers can provide a void cheque for payments.
            </Description>
          </RadioField>
        </RadioGroup>
      </div>

      <CheckboxField
        className={withPrefix(
          "border-1 rounded-md pf:overflow-hidden p-2 mt-4",
          showValidationError &&
            formData.accept_preauth_terms_and_conditions === ""
            ? "border-red-500"
            : "border-transparent",
        )}
      >
        <Checkbox
          color="green"
          name="accept_preauth_terms_and_conditions"
          value={formData.accept_preauth_terms_and_conditions}
          checked={formData.accept_preauth_terms_and_conditions === "true"}
          onChange={(checked) => {
            dispatch(
              updateField({
                field: "accept_preauth_terms_and_conditions",
                value: checked ? "true" : "",
              }),
            );
          }}
        />
        <Label className={withPrefix("text-sm font-bold")}>
          I accept the terms and conditions of pre-auth payments
        </Label>
      </CheckboxField>

      <AllFieldsRequiredMessage show={showValidationError} id="/page2" />
      <FooterWrapper>
        <NavButton
          action={() => {
            if (pageIsValid) {
              navigate(from ? `/form_${from}` : "/form_page3");
            } else {
              setShowValidationError(true);
            }
          }}
          label={"Save and Continue"}
          currentPage="page2"
          disabledButClickable={!validatedForm.valid}
        />
      </FooterWrapper>
    </div>
  );
}

export default FormPage2;

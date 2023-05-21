import React from 'react';
interface IProp {
  id: string;
  placeholder: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  required: boolean;
  testAtribute: string;
}
const PaymentInput = React.forwardRef(
  (props: IProp, ref: React.LegacyRef<HTMLInputElement> | undefined) => {
    const { id, placeholder, name, onChange, onBlur, testAtribute } = props;
    return (
      <>
        <input
          name={name}
          type="number"
          ref={ref}
          id={id}
          step={500}
          min={0}
          onChange={onChange}
          onBlur={onBlur}
          className="filter-form_payment_input"
          placeholder={placeholder}
          data-elem={testAtribute}
        />
      </>
    );
  }
);

export default PaymentInput;

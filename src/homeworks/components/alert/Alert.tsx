import React, { useContext } from 'react';
import { ModalWindow } from '../modalWindow/ModalWindow';
import { LanguageContext } from '../LanguageContext';

interface ButtonProps {
  text: string;
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return <button onClick={props.clickHandler}>{props.text}</button>;
};

interface InputTextProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const InputText: React.FC<InputTextProps> = ({ ...props }) => {
  return <input type="text" onChange={props.onChange} />;
};

export const Alert: React.FC = () => {
  const [text, setText] = React.useState('');
  const [isVisible, setIsVisble] = React.useState(false);
  const language = useContext(LanguageContext);

  return (
    <>
      <div>
        <InputText
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        />
      </div>
      <div>
        <Button text={language.translater('open-window')} clickHandler={() => setIsVisble((prev) => !prev)} />
      </div>

      <ModalWindow title={language.translater('window')} isVisible={isVisible} setVisible={setIsVisble}>
        <p>{text}</p>
      </ModalWindow>
    </>
  );
};

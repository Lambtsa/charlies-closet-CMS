import React from 'react';

interface ColorSelectorProps {
  state: string,
  setState: any,
}

const ColorSelector = (props: ColorSelectorProps) => {
  const {state, setState} = props;

  return (
    <>
      <div className="color__selector">
        <button
          type="button"
          className={`color ${state === 'black' ? 'selected' : ''}`}
          value="black"
          onClick={(e: any) => setState(e.target.value)} />
        <button
          type="button"
          className={`color ${state === 'white' ? 'selected' : ''}`}
          value="white"
          onClick={(e: any) => setState(e.target.value)} />
        <button
          type="button"
          className={`color ${state === 'blue' ? 'selected' : ''}`}
          value="blue"
          onClick={(e: any) => setState(e.target.value)} />
        <button
          type="button"
          className={`color ${state === 'pink' ? 'selected' : ''}`}
          value="pink"
          onClick={(e: any) => setState(e.target.value)} />
        <button
          type="button"
          className={`color ${state === 'green' ? 'selected' : ''}`}
          value="green"
          onClick={(e: any) => setState(e.target.value)} />
        <button
          type="button"
          className={`color ${state === 'beige' ? 'selected' : ''}`}
          value="beige"
          onClick={(e: any) => setState(e.target.value)} />
      </div>
    </>
  )
};

export default ColorSelector;

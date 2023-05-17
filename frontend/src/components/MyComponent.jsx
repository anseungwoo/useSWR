import { useState, useEffect } from 'react';

function MyComponent() {
  const [clickedDiv, setClickedDiv] = useState(null);
  const [text, setText] = useState('');

  const handleDivClick = (event) => {
    if (clickedDiv) {
      clickedDiv.classList.remove('selected');
    }
    setClickedDiv(event.target);
    event.target.classList.add('selected');
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
    if (clickedDiv) {
      clickedDiv.textContent = event.target.value;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (clickedDiv && !clickedDiv.contains(event.target)) {
        clickedDiv.classList.remove('selected');
        setClickedDiv(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [clickedDiv]);

  return (
    <div>
      <div onClick={handleDivClick}>Div 1</div>
      <div onClick={handleDivClick}>Div 2</div>
      <div onClick={handleDivClick}>Div 3</div>
      <div onClick={handleDivClick}>Div 4</div>
      <input type="text" value={text} onChange={handleInputChange} />
    </div>
  );
}
export default MyComponent;

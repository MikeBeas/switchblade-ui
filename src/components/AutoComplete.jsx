import { useEffect, useState } from 'react';
import Input from 'components/Input';
import animation from 'styles/animations.module.css';
import styles from 'styles/AutoComplete.module.css';

const AutoComplete = ({ onChange, onSearch, options = [], loading, emptyMessage, value, ...restProps }) => {
  const [inputValue, setInputValue] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => { onSearch(inputValue) }, [inputValue]);

  useEffect(() => { setInputValue(value?.label) }, [value?.label]);

  return (
    <>
      <div className={styles.container}>
        <Input
          value={inputValue}
          onFocus={() => setOpenDropdown(true)}
          onBlur={() => {
            setOpenDropdown(false)
            if (value?.label && inputValue !== value?.label) {
              setInputValue(value?.label);
            }
          }}
          onChange={setInputValue}
          button={{
            onClick: () => {
              onChange(null);
              setInputValue(null)
            },
            children: 'Clear'
          }}
          {...restProps}
        />
        {(
          <div
            className={`${styles.dropdownOptions} ${animation.dropdown}`}
            style={{ display: openDropdown && inputValue ? '' : 'none' }}
          >
            {loading && options.length === 0 ?
              <div className={styles.optionSpace}>{emptyMessage ?? 'Searching...'}</div> : (
                options.length === 0 ?
                  (<div className={styles.optionSpace}>{emptyMessage ?? 'No matches'}</div>) :
                  options.map((o) => (
                    <div
                      key={o.value}
                      onMouseDown={() => onChange(o)}
                      className={`${styles.optionSpace} ${styles.option}`}
                    >
                      {o.label}
                    </div>
                  ))
              )}
          </div>
        )}
      </div>
    </>
  )
}

export default AutoComplete;
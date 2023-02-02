import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";

export default function CustomSelect({ onChange, ...props }) {
  const [selectedOption, setSelectedOption] = useState(props.isMulti ? [] : null);
  const { ValueContainer, Placeholder } = components;

  const CustomValueContainer = ({ children, ...props }) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} isFocused={props.isFocused}>
          {props.selectProps.placeholder}
        </Placeholder>
        {
          React.Children.map(children, child =>
            child && child.type !== Placeholder ? child : null
          )
        }
      </ValueContainer>
    );
  };

  useEffect(() => {
    findSelectedOptionObject(props.defaultValue)
  }, [`${props.isMulti ? Array.from(props.defaultValue || []) : props.defaultValue}`])

  function findSelectedOptionObject(value) {
    let options;
    if (props.isMulti) {
      options = value?.map(id => props.options.find(item => item.value === id)) || []
    } else {
      options = props.options?.find(item => item.value === value) || {}
    }
    handleSelectChange(options);
  }

  const handleSelectChange = (options) => {
    let value = props.isMulti ? (Boolean(options?.length) ? options.map(item => item.value) : null) : options?.value;
    setSelectedOption(props.isMulti ? (options || []) : options);
    onChange(props.name, value, options);
  }

  const styles = {
    menuPortal: base => ({ ...base, zIndex: 9999 }),
    valueContainer: (base, state) => ({
      ...base,
      overflow: "visible"
    }),
    placeholder: (base, state) => ({
      ...base,
      position: "absolute",
      transition: "top 0.2s, font-size 0.1s",
      top: state.hasValue || state.selectProps.inputValue ? -13 : "13%",
      fontSize: (state.hasValue || state.selectProps.inputValue) && 12
    })
  }

  return (
    <Select
      placeholder={props.label}
      name={props.name}
      options={props.options}
      className={props.className}
      classNamePrefix={props.classNamePrefix}
      value={selectedOption}
      onChange={handleSelectChange}
      components={{
        ValueContainer: CustomValueContainer,
      }}
      isClearable={props.isClearable}
      styles={styles}
      isMulti={props.isMulti}
      menuPortalTarget={document.body}
      {...props}
    />
  )
}

CustomSelect.propTypes = {
  className: PropTypes.string,
  classNamePrefix: PropTypes.string,
  isClearable: PropTypes.bool,
};

CustomSelect.defaultProps = {
  className: "select-sm",
  classNamePrefix: "react-select",
  isClearable: true,
}
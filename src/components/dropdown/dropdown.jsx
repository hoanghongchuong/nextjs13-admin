import React, {useEffect, useRef} from 'react'


const useClickOutsideRef = (contentRef, toggleRef) => {
    const handleClickOutside = (e) => {
      if (toggleRef.current && toggleRef.current.contains(e.target)) {
        contentRef.current.classList.toggle('active');
      } else {
        if (contentRef.current && !contentRef.current.contains(e.target)) {
          contentRef.current.classList.remove('active');
        }
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [contentRef, toggleRef]);
  };

const DropdownCustom = props => {

    const dropdown_toggle_el = useRef(null)
    const dropdown_content_el = useRef(null)

    useClickOutsideRef(dropdown_content_el, dropdown_toggle_el)
    const classCustom = props.classCustom ? props.classCustom : ''
    return (
        <div className="dropdown">
            <button ref={dropdown_toggle_el} className={`dropdown-toggle-custom ${classCustom}`}>
                {
                    props.icon ? <i className={props.icon}></i> : ''
                }
                {
                    props.badge ? <span className="dropdown-toggle-badge">{props.badge}</span> : ''
                }
                {
                    props.customToggle ? props.customToggle() : ''
                }
            </button>
            <div ref={dropdown_content_el} className="dropdown-content">
                {
                    props.contentData && props.renderItems ? props.contentData.map((item, index) => props.renderItems(item, index)) : ''
                }
                {
                    props.renderFooter ? (
                        <div className="dropdown-footer">
                            {props.renderFooter()}
                        </div>
                    ) : ''
                }
            </div>
        </div>
    )
}

export default DropdownCustom

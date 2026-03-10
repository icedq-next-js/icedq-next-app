import React from 'react';

// Gravity Forms component - styling is in globals.css
export default function GravityForm({ id }) {
  return (
    <div className="gform_wrapper">
      <form method="post" action="#" className="gform_form">
        <div className="gform_body">
          <ul className="gform_fields">
            <li className="gfield">
              <label htmlFor="gform_name">
                Full name <span className="gfield_required">*</span>
              </label>
              <input 
                name="gform_name" 
                id="gform_name" 
                type="text" 
                placeholder="" 
                required 
                className="gform_input_text"
              />
            </li>
            <li className="gfield">
              <label htmlFor="gform_email">
                Company email <span className="gfield_required">*</span>
              </label>
              <input 
                name="gform_email" 
                id="gform_email" 
                type="email" 
                placeholder="" 
                required 
                className="gform_input_email"
              />
            </li>
          </ul>
        </div>
        <div className="gform_footer">
          <input 
            type="submit" 
            value="Submit" 
            className="gform_button" 
          />
        </div>
      </form>
    </div>
  );
}

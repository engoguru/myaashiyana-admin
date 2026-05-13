
const CustomInput = ({ type, name, val, label, i_id, i_class, onCh, onBl }) => {

  return (
    <>
      <div className="form-floating mt-3">
        <input
          type={type}
          className={`form-control ${i_class}`}
          id={`floatingInput ${i_id}`}
          placeholder={label}
          name={name}
          value={val}
          onChange={onCh}
          onBlur={onBl} />
        <label
          htmlFor={label}>{label}                                          
        </label>
      </div>
    </>
  )
}


export default CustomInput;

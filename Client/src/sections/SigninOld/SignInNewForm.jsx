import styles from "./signinform.module.css";
const SignInNewForm = ({formData, setFormData, submitAct, formErrors}) => {

    const handleInput = (e, field) => {
        e.persist()
        setFormData((oldData) => {
            let newData = {...oldData}
            newData[field] = e.target.value
            return newData
        })
    }

  return (
    <>
      <div className={styles.empty}></div>
      <div className={styles.bg}>
        <div className={styles.form}>
          <div className={styles.head}>SIGN IN</div>
          <form className={styles.signin}>

            <div className={styles.infoBox + " " + ((formErrors.email != null) ? styles.error : "")}>
              {/* <div className="info">Email-id :</div> */}
              <input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={formData.email}
                onChange={(e) => { handleInput(e, "email") }}/>
            </div>
           
            <div className={styles.flexbox}>
              <div className={styles.infoBox + " " + ((formErrors.password != null) ? styles.error : "")}>
              {/* <div className="info">Password:</div> */}
              <input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={(e) => { handleInput(e, "password") }}/>
              </div>

            </div>
            
          </form>

          <div className={styles.errorText}>
            {formErrors[Object.keys(formErrors)[0]] || ""}
          </div>


          <div className={styles.btn} onClick={submitAct}>
            <button>Sign In</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInNewForm;
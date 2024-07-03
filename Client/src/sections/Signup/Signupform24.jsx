import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loading-icons";
import styles from "./signupform.module.css";
const SignUpNew24 = ({formData, setFormData, submitAct, formErrors,loading}) => {
    
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
          <div className={styles.head}>SIGN UP</div>
          <form className={styles.signup}>

            <div className={styles.infoBox + " " + ((formErrors.username != null) ? styles.error : "")}>
              {/* <div className="info">Name :</div> */}
              <input
                id="name"
                type="text"
                placeholder="Name"
                required
                value={formData.username}
                onChange={(e) => { handleInput(e, "username") }}/>
            </div>

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
            <div className={styles.infoBox + " " + ((formErrors.phone != null) ? styles.error : "")}>
              {/* <div className="info">Contact Number :</div> */}
              <input
                id="contact"
                type="number"
                placeholder="Contact Number"
                required
                value={formData.phone}
                onChange={(e) => { handleInput(e, "phone") }}/>
            </div>

            <div className={styles.infoBox + " " + ((formErrors.gender != null) ? styles.error : "")}>
              {/* <div className="info">Gender :</div> */}
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={(e) => { handleInput(e, "gender") }}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            </div>
            <div className={styles.infoBox + " " + ((formErrors.college != null) ? styles.error : "")}>
              {/* <div className="info">College:</div> */}
              <input
                id="clg"
                type="text"
                placeholder="College"
                required
                value={formData.college}
                onChange={(e) => { handleInput(e, "college") }}/>
            </div>

            <div className={styles.infoBox + " " + ((formErrors.collegeid != null) ? styles.error : "")}>
              {/* <div className="info">College Id :</div> */}
              <input
                id="clg-id"
                type="text"
                placeholder="College Id"
                required
                value={formData.collegeid}
                onChange={(e) => { handleInput(e, "collegeid") }}/>
            </div>

            <div className={styles.infoBox + " " + ((formErrors.department != null) ? styles.error : "")}>
              {/* <div className="info">Department:</div> */}
              <input
              id="department"
              type="text"
              placeholder="Department"
              required
              value={formData.department}
              onChange={(e) => { handleInput(e, "department") }}/>
            </div>

            <div className={styles.flexbox}>
            <div className={styles.infoBox + " " + ((formErrors.city != null) ? styles.error : "")}>
              {/* <div className="info">City :</div> */}
              <input
                id="city"
                type="text"
                placeholder="City"
                required
                value={formData.city}
                onChange={(e) => { handleInput(e, "city") }}/>
            </div>

            <div className={styles.infoBox + " " + ((formErrors.state != null) ? styles.error : "")}>
              {/* <div className="info">State :</div> */}
              <input 
                id="state"
                type="text"
                placeholder="State"
                required
                value={formData.state}
                onChange={(e) => { handleInput(e, "state") }}/>
            </div>
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

              <div className={styles.infoBox + " " + ((formErrors.conpassword != null) ? styles.error : "")}>
              {/* <div className="info">Confirm Password:</div> */}
              <input
                id="department"
                type="password"
                placeholder="Confirm Password"
                required
                value={formData.conpassword}
                onChange={(e) => { handleInput(e, "conpassword") }}/>
              </div>
            </div>
            
          </form>

          <div className={styles.errorText}>
            {formErrors[Object.keys(formErrors)[0]] || ""}
          </div>


          <div className={styles.btn} onClick={submitAct}>
            <button>
                {loading ? (
                  <div
                    style={{
                      marginRight: "9px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TailSpin width="20" height="20" style={{fill:"black"}} />
                  </div>
                ) : (
                  <p>Sign Up</p>
                )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpNew24;